import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../Redux/Actions/UsersActions";
import { NavLink } from "react-router-dom";
import styles from "./CartItem.module.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

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
          ${price}.00 x {quantity} = ${price * quantity}.00
        </h5>
        <button className={styles.btnCart} value="+" onClick={handleChange}>
          <AddIcon />
        </button>
        <button className={styles.btnCart} value="-" onClick={handleChange}>
          <RemoveIcon />
        </button>
        <button className={styles.btnCart} value="all" onClick={handleChange}>
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
}
