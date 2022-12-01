import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPermissions } from "../../../Redux/Actions/AdminActions";

export function UserListCard({ email, adminPermissions }) {
  let dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.target.value === "roll") {
      if (adminPermissions) {
        dispatch(
          updateUserPermissions({
            email: email,
            adminPermissions: false,
          })
        );
        return;
      }
      dispatch(
        updateUserPermissions({
          email: email,
          adminPermissions: true,
        })
      );
    }
  };

  return (
    <>
      <div>
        <h4>{email}</h4>
        <p>{adminPermissions ? "Roll: Admin" : "Roll: User"}</p>
      </div>
      <div>
        <button value="roll" onClick={handleClick}>
          Change Roll
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
                adminPermissions={user.adminPermissions}
              />
            ))
        : null}
    </>
  );
};
