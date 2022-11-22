import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  clearCartInDb,
  getCartFromDB,
  postCartToDB,
} from "../../Redux/Actions/UsersActions";
import CartItem from "./CartItem";
import styles from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { deleteStorage } from "../../localStorage/localStorageFunctions";
import { useEffect } from "react";
import Success from "../Success/Success";
import { useAuth0 } from "@auth0/auth0-react";

export default function ShoppingCart({ toggleShow }) {
  let { isAuthenticated } = useAuth0();
  let reduxCart = useSelector((state) => state);
  let userId = JSON.parse(sessionStorage.getItem("userId"));
  let dispatch = useDispatch();
  useEffect(() => {
    if (
      isAuthenticated === true &&
      reduxCart.shoppingCart.length &&
      !reduxCart.cartDB.cartProducts?.length
    ) {
      for (let i = 0; i < reduxCart.shoppingCart.length; i++) {
        dispatch(
          postCartToDB({
            userId: userId,
            productId: reduxCart.shoppingCart[i].id,
            amount: reduxCart.shoppingCart[i].amount,
          })
        );
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (reduxCart.token) {
      dispatch(getCartFromDB(userId));
    }
  }, [dispatch]);

  let totalItemsAdded = reduxCart.shoppingCart.length
    ? reduxCart.shoppingCart
        .map((item) => item.amount)
        .reduce((acc, item) => (acc += item))
    : 0;

  let totalPayment = reduxCart.shoppingCart.length
    ? reduxCart.shoppingCart
        .map((elem) =>
          elem.amount ? Number(elem.price) * elem.amount : Number(elem.price)
        )
        .reduce((acc, elem) => (acc += elem))
    : 0;

  useEffect(() => {}, [reduxCart.shoppingCart]);

  const handleClick = (e) => {
    e.preventDefault();
    if (reduxCart.token) {
      dispatch(clearCartInDb(reduxCart.cartDB.id));
    }
    deleteStorage("shoppCart");
    dispatch(clearCart());
  };

  return (
    <div>
      {reduxCart.shoppingCart.length ||
      reduxCart.cartDB.cartProducts?.length ? (
        <div className={styles.shoppingContainer}>
          <button className={styles.btnClear} onClick={handleClick}>
            Clear cart
          </button>
          {reduxCart.token ? (
            <>
              <div className={styles.textContainer}>
                <span>
                  Items:
                  {Object.entries(reduxCart.cartDB).length
                    ? reduxCart.cartDB?.cartProducts
                        ?.map((e) => (e.amount ? e.amount : 1))
                        .reduce((acc, e) => (acc += e), 0)
                    : 0}
                </span>
                <span>
                  Total:
                  {Object.entries(reduxCart.cartDB).length
                    ? reduxCart.cartDB.total
                    : 0}
                </span>
              </div>
              <div className={styles.cardsContainer}>
                {reduxCart.cartDB.cartProducts?.map((e, index) => (
                  <CartItem
                    key={index}
                    id={e.productId}
                    name={e.product.name}
                    image={e.product.image}
                    price={e.product.price}
                    size={e.product.size}
                    brandName={e.product.brandName}
                    categoryName={e.product.categoryName}
                    amount={e.amount}
                    userId={userId}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className={styles.textContainer}>
                <span>Items: {totalItemsAdded}</span>
                <span>Total: {totalPayment}</span>
              </div>
              <div className={styles.cardsContainer}>
                {reduxCart.shoppingCart.map((e, index) => (
                  <CartItem
                    key={index}
                    id={e.id}
                    name={e.name}
                    image={e.image}
                    price={e.price}
                    size={e.size}
                    brandName={e.brandName}
                    categoryName={e.categoryName}
                    amount={e.amount}
                    userId={userId}
                  />
                ))}
              </div>
            </>
          )}
          <button className={styles.btnPay}>Buy it all!</button>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <div className={styles.icon}>
            <AddShoppingCartIcon fontSize="large" />
          </div>
          <p className={styles.emptyCart}>You haven't selected products yet</p>
          {reduxCart.success.length ? (
            <Success success={reduxCart.success} />
          ) : null}
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
