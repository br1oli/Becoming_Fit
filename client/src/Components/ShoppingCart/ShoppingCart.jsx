import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, clearCartInDb, clearSuccess } from "../../Redux/Actions/UsersActions";
import CartItem from "./CartItem";
import styles from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { deleteStorage } from "../../localStorage/localStorageFunctions";
//AUTH0
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Success from "../Success/Success";
import Error from "../Error/Error";

export default function ShoppingCart({ toggleShow }) {
  let reduxCart = useSelector((state) => state);
  let dispatch = useDispatch();
  //AUTH0
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState([]);

  useEffect(() => {
    const generarToken = async () => {
      try {
        const tokenApi = await getAccessTokenSilently();
        setToken(tokenApi);
        console.log(`ESTO SERIA EL TOKEN API  ${tokenApi}`);
        console.log(`ESTO SERIA EL TOKEN ${token}`);
      } catch (error) {
        console.log(error);
      }
    };
    generarToken();
  }, []);

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
    if (reduxCart.success) {
      dispatch(clearSuccess())
    }
    if (token) {
      dispatch(
        clearCartInDb(/*deberia recibir id del usuario para buscar el carrito relacionado a ese usuario*/)
      );
    }
    deleteStorage("shoppCart");
    dispatch(clearCart());
  };
  return (
    <div>
      {reduxCart.shoppingCart.length ? (
        <div className={styles.shoppingContainer}>
          <button className={styles.btnClear} onClick={handleClick}>
            Clear cart
          </button>
          <div className={styles.textContainer}>
            <span>Items: {totalItemsAdded}</span>
            <span>Total: {totalPayment}</span>
          </div>
          <div className={styles.cardsContainer}>
            {reduxCart.shoppingCart.map((e, index) => (
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
