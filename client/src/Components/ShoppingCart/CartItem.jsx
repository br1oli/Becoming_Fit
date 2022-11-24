import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteFromCart,
  deleteProductCartInDb,
  getCartFromDB,
  postCartToDB,
} from "../../Redux/Actions/UsersActions";
import { NavLink } from "react-router-dom";
import styles from "./CartItem.module.css";
//AUTH0

export default function CartItem({
  id,
  name,
  price,
  image,
  color,
  size,
  brandName,
  categoryName,
  amount,
  userId,
}) {
  let dispatch = useDispatch();
  let token = useSelector((state) => state.token);

  const handleChange = async (e) => {
    e.preventDefault();
    if (token) {
      if (e.target.value === "+") {
        await dispatch(
          postCartToDB({
            userId: userId,
            productId: id,
            amount: 1,
            color: color,
            size: size,
          })
        );
        dispatch(getCartFromDB(userId));
      }

      if (e.target.value === "-") {
        await dispatch(
          postCartToDB({
            userId: userId,
            productId: id,
            amount: -1,
            color: color,
            size: size,
          })
        );
        dispatch(getCartFromDB(userId));
      }
      if (e.target.value === "all") {
        await dispatch(
          deleteProductCartInDb({ productId: id, color: color, size: size })
        );
        dispatch(getCartFromDB(userId));
      }
    } else {
      if (e.target.value === "+") {
        dispatch(addToCart({ id: id, color: color, size: size }));
      }

      if (e.target.value === "-") {
        dispatch(deleteFromCart({ id: id, color: color, size: size }));
      }

      if (e.target.value === "all") {
        dispatch(deleteFromCart({ id: id, color: color, size: size }, true));
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <NavLink to={`/home/${id}`}>
          <img className={styles.image} src={image} alt="" />
          <h4 className={styles.titleCart}>{name}</h4>
        </NavLink>
        <p>{size}</p>
        <p>{brandName}</p>
        <p>{categoryName}</p>
        <h5>
          ${price}.00 x {amount} = ${price * amount}.00
        </h5>
        <button className={styles.btnCart} value="+" onClick={handleChange}>
          +
        </button>
        {amount > 1 ? (
          <button className={styles.btnCart} value="-" onClick={handleChange}>
            -
          </button>
        ) : null}
        <button className={styles.btnCart} value="all" onClick={handleChange}>
          DELETE
        </button>
      </div>
    </div>
  );
}
