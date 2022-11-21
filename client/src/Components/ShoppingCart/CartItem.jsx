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
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";

export default function CartItem({
  id,
  name,
  price,
  image,
  size,
  brandName,
  categoryName,
  amount,
  userId,
}) {
  let dispatch = useDispatch();
  let token = useSelector((state) => state.token);
  /*  let { id, name, price, image, size, brandName, categoryName, amount } = data; */
  const handleChange = (e) => {
    e.preventDefault();
    if (token) {
      if (e.target.value === "+") {
        dispatch(postCartToDB({ userId: userId, productId: id, amount: 1 }));
      }

      if (e.target.value === "-") {
        dispatch(postCartToDB({ userId: userId, productId: id, amount: -1 }));
      }
      if (e.target.value === "all") {
        dispatch(deleteProductCartInDb(id));
      }
    } else {
      if (e.target.value === "+") {
        dispatch(addToCart(id));
      }

      if (e.target.value === "-") {
        dispatch(deleteFromCart(id));
      }

      if (e.target.value === "all") {
        dispatch(deleteFromCart(id, true));
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
        <button className={styles.btnCart} value="-" onClick={handleChange}>
          -
        </button>
        <button className={styles.btnCart} value="all" onClick={handleChange}>
          DELETE
        </button>
      </div>
    </div>
  );
}
