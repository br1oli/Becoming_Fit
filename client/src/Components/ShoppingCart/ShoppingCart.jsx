import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  clearCartInDb,
  getCartFromDB,
  postCartToDB,
  paymentOrder,
} from "../../Redux/Actions/UsersActions";
import CartItem from "./CartItem";
import styles from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { deleteStorage } from "../../localStorage/localStorageFunctions";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

export default function ShoppingCart({ toggleShow }) {
  let { user } = useAuth0();
  let reduxCart = useSelector((state) => state);
  let dispatch = useDispatch();
  let userId = useSelector((state) => state.userStore.email);
  let userProfile = useSelector((state) => state.userProfile);
  let history = useHistory();
  let paymentLink = useSelector((state) => state.paymentLink);

  useEffect(() => {
    if (reduxCart.token.length) {
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
    if (reduxCart.token.length) {
      dispatch(clearCartInDb(reduxCart.cartDB.id));
    }
    deleteStorage("shoppCart");
    dispatch(clearCart());
  };

  const handleBuyOrder = async (e) => {
    e.preventDefault();
    if (reduxCart.token.length) {
      try {
        if (
          !userProfile.name &&
          !userProfile.email &&
          !userProfile.adress &&
          !userProfile.country &&
          !userProfile.city &&
          !userProfile.zipCode &&
          !userProfile.phone
        ) {
          e.preventDefault();
          //dispatch(paymentOrder(reduxCart.cartDB.userEmail));
          history.push("/complete");
        } else if (
          userProfile.adress &&
          userProfile.country &&
          userProfile.city &&
          userProfile.zipCode &&
          userProfile.phone &&
          userProfile.adress
        ) {
          dispatch(paymentOrder(reduxCart.cartDB.userEmail));
          history.push("/formpayment");
        }
      } catch (error) {
        console.log(error);
      }
    }

    /*     e.preventDefault();
    if (reduxCart.token.length) {
      dispatch(paymentOrder(reduxCart.cartDB.userEmail));
    }
    deleteStorage("shoppCart");
    dispatch(clearCart()); */
  };

  const payOrRegister = (e) => {
    try {
      if (!user.address || user.phone) {
        e.preventDefault();
        history.push("/complete");
      } else {
        e.preventDefault();
        // history.push('/pasarela')
        alert("LINK A LA PASARELA DE PAGOS");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlert = () => {
    alert ('You must be logged if you want to make a purchase')
  }

  return (
    <>
      {reduxCart.token.length && reduxCart.cartDB.cartProducts?.length ? (
        <>
          <div className={styles.shoppingContainer}>
            <button className={styles.btnClear} onClick={handleClick}>
              Clear cart
            </button>
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

            {reduxCart.cartDB?.cartProducts
              ?.sort((a, b) => a.id - b.id)
              .map((e, index) => (
                <CartItem
                  key={index}
                  id={e.productId}
                  name={e.product.name}
                  image={e.product.image}
                  price={e.product.price}
                  size={e.size}
                  color={e.color}
                  brandName={e.product.brandName}
                  categoryName={e.product.categoryName}
                  amount={e.amount}
                  userId={userId}
                />
              ))}
            <div>
              {paymentLink ? (
                <a href={paymentLink}>Go to pay!</a>
              ) : (
                <button onClick={handleBuyOrder} className={styles.btnPay}>
                  Buy it all!
                </button>
              )}
            </div>
          </div>
        </>
      ) : reduxCart.token.length && !reduxCart.cartDB.cartProducts?.length ? (
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
      ) : null}
      {reduxCart.shoppingCart.length && !reduxCart.token.length ? (
        <>
          <div className={styles.shoppingContainer}>
            <button className={styles.btnClear} onClick={handleClick}>
              Clear cart
            </button>
            <div className={styles.textContainer}>
              <span>Items: {totalItemsAdded}</span>
              <span>Total: {totalPayment}</span>
            </div>
            {reduxCart.shoppingCart.map((e, index) => (
              <CartItem
                key={index}
                id={e.id}
                name={e.name}
                image={e.image}
                price={e.price}
                size={e.size}
                color={e.color}
                brandName={e.brandName}
                categoryName={e.categoryName}
                amount={e.amount}
                userId={userId}
              />
            ))}
            <button className={styles.btnPay} onClick={handleAlert}>Buy it all!</button>
          </div>
        </>
      ) : !reduxCart.token.length && !reduxCart.shoppingCart.length ? (
        <>
          <div className={styles.emptyCart}>
            <div className={styles.icon}>
              <AddShoppingCartIcon fontSize="large" />
            </div>
            <p className={styles.emptyCart}>
              You haven't selected products yet
            </p>
            <Link to={"/home"}>
              <button className={styles.btnHome} onClick={toggleShow}>
                Start shopping!
              </button>
            </Link>
          </div>
        </>
      ) : null}
    </>
  );
}
