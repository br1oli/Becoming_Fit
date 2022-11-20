import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, sendOrder } from "../../Redux/Actions/UsersActions";
import CartItem from "./CartItem";
import styles from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { deleteStorage } from "../../localStorage/localStorageFunctions";
//AUTH0
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export default function ShoppingCart({ toggleShow }) {
  let reduxCart = useSelector((state) => state);
  let dispatch = useDispatch();
  //AUTH0
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState([]);
  const [order, setOrder] = useState([]);

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

  useEffect(() => {
    setOrder([...reduxCart.shoppingCart]);
  }, [reduxCart.shoppingCart]);

  const handleChange = (e) => {
    e.preventDefault();
    deleteStorage("shoppCart");
    dispatch(clearCart());
  };

  const handleOrder = (e) => {
    e.preventDefault();
    console.log("order enviada", order);
    dispatch(sendOrder(order));
  };

  return (
    <div>
      {reduxCart.shoppingCart.length ? (
        <div className={styles.shoppingContainer}>
          <button className={styles.btnClear} onClick={handleChange}>
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
          <button className={styles.btnPay} onClick={handleOrder}>
            Buy it all!
          </button>
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
