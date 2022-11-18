import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../Redux/Actions/UsersActions";
import CartItem from "./CartItem";
import styles from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export default function ShoppingCart({ toggleShow }) {
  let shoppingCart = useSelector((state) => state);
  let dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };
  return (
    <div>
      {shoppingCart.shoppingCart.length ? (
        <div className={styles.shoppingContainer}>
          <button className={styles.btnClear} onClick={handleChange}>
            Clear cart
          </button>
          <div className={styles.textContainer}>
            <span>Items: {shoppingCart.totalItemsInCart}</span>
            <span>Total: {shoppingCart.totalToPay}</span>
          </div>
          <div className={styles.cardsContainer}>
            {shoppingCart.shoppingCart.map((e, index) => (
              <CartItem key={index} data={e} />
            ))}
          </div>
          <button className={styles.btnPay}>Buy it all!</button>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <div className={styles.icon}>
            <AddShoppingCartIcon fontSize="large" />
          </div>
          <p className={styles.emptyCart}>You haven't selected products yet</p>
          <Link to={"/home"}>
            <button className={styles.btnHome} onClick={toggleShow}>
              Start shopping!
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
