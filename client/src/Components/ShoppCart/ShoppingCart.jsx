import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../Redux/Actions/UsersActions";
import CartItem from "./CartItem";
import styles from "./ShoppingCart.module.css";

export default function ShoppingCart() {
  let shoppingCart = useSelector((state) => state);
  let dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };
  return (
    <>
      {shoppingCart.shoppingCart.length ? (
        <div className={styles.shoppingContainer}>
          <button className={styles.btnClear} onClick={handleChange}>
            Clear cart
          </button>
          <div>
            <span className={styles.items}>
              Items: {shoppingCart.totalItemsInCart}
            </span>
            <span>Total: {shoppingCart.totalToPay}</span>

            {shoppingCart.shoppingCart.map((e, index) => (
              <CartItem key={index} data={e} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
