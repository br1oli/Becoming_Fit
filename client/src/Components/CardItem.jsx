import React from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  deleteFromCart,
  clearCart,
} from "../Redux/Actions/UsersActions";
import { NavLink } from "react-router-dom";

export default function CartItem({ data }) {
  let dispatch = useDispatch();

  let { id, name, price, image, size, brandName, categoryName, quantity } =
    data;
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value === "+") {
      dispatch(addToCart(id));
    }

    if (e.target.value === "-") {
      dispatch(deleteFromCart(id));
    }

    if (e.target.value === "all") {
      dispatch(deleteFromCart(id, true));
    }
  };
  return (
    <div>
      <NavLink to="/home/:id">
        <h4>{name}</h4>
        <img src={image} alt="" />
      </NavLink>
      <p>{size}</p>
      <p>{brandName}</p>
      <p>{categoryName}</p>

      <h5>
        ${price}.00 x {quantity} = ${price * quantity}.00
      </h5>
      <button value="+" onClick={handleChange}>
        +
      </button>
      <button value="-" onClick={handleChange}>
        -
      </button>
      <button value="all" onClick={handleChange}>
        Delete all
      </button>
    </div>
  );
}
