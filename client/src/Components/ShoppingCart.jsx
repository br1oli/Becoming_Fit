import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  deleteFromCart,
} from "../Redux/Actions/UsersActions";
import CartItem from "./CardItem";

export default function ShoppingCart() {
  let shoppingCart = useSelector((state) => state);
  let dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };
  return (
    <div style={{ margin: "15px" }}>
      {shoppingCart.shoppingCart.length ? (
        <>
          <button onClick={handleChange}>Clear cart</button>
          <div>
            <span>Items: {shoppingCart.totalItemsInCart}</span>
            <span>Total: {shoppingCart.totalToPay}</span>

            {shoppingCart.shoppingCart?.map((e, index) => (
              <CartItem
                key={index}
                data={e}
                deleteFromCart={deleteFromCart}
                addToCart={addToCart}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
