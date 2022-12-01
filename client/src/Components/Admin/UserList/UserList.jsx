import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPermissions } from "../../../Redux/Actions/AdminActions";

export function UserListCard({ email, isBanned, adminPermissions, resetPassword }) {
  let dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.target.value === "banned") {
      if (isBanned) {
        dispatch(
          updateUserPermissions({
            email: email,
            isBanned: false,
            adminPermissions: false,
          })
        );
        return;
      }
      dispatch(
        updateUserPermissions({
          email: email,
          isBanned: true,
          adminPermissions: false,
        })
      );
    }
    if (e.target.value === "roll") {
      if (adminPermissions) {
        dispatch(
          updateUserPermissions({
            email: email,
            adminPermissions: false,
            isBanned: false,
          })
        );
        return;
      }
      dispatch(
        updateUserPermissions({
          email: email,
          adminPermissions: true,
          isBanned: false,
        })
      );
    }
    if (e.target.value === "reset") {
      if (resetPassword) {
        dispatch(
          updateUserPermissions({
            email: email,
            adminPermissions: false,
            isBanned: false,
            resetPassword: false,
          })
        );
        return;
      }
      dispatch(
        updateUserPermissions({
          email: email,
          adminPermissions: false,
          isBanned: false,
          resetPassword: true,
        })
      );
    }
  };

  return (
    <>
      <div>
        <h4>{email}</h4>
        <p>{adminPermissions ? "Roll: Admin" : "Roll: User"}</p>
        <p>{isBanned ? "Status: Banned" : "Status: Active"}</p>
        <p>
          {resetPassword
            ? "Status: Reset password required"
            : "Status: No reset password required"}
        </p>
      </div>
      <div>
        <button value="banned" onClick={handleClick}>
          Ban User
        </button>
        <button value="roll" onClick={handleClick}>
          Change Roll
        </button>
        <button value="reset" onClick={handleClick}>
          Reset Password
        </button>
      </div>
    </>
  );
}


export const UserList = () => {
  let users = useSelector((state) => state.usersStore);

  return (
    <>
      {users.length
        ? users
            //este sort los va a renderizar siempre ordenados alfabeticamente
            .sort((a, b) => a.email.localeCompare(b.email))
            .map((user, index) => (
              <UserListCard
                key={index}
                email={user.email}
                isBanned={user.isBanned}
                adminPermissions={user.adminPermissions}
                resetPassword={user.resetPassword}
              />
            ))
        : null}
    </>
  );
};
