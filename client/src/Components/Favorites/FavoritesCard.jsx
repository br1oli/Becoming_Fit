import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./FavoriteCard.module.css";
import { removeOneProductFromFavorites, addToCart } from "../../Redux/Actions/UsersActions"


const FavoriteCard = ( {data, favoriteId} ) => {
    const dispatch = useDispatch();
    let { id, name, price, image } = data;

    const removeItem = (e) => {
        e.preventDefault()
            dispatch(removeOneProductFromFavorites(favoriteId));
    }

    const addItemToCart = (e) => {
        e.preventDefault()
        dispatch(addToCart(id))
    }

    return (
        <div className={styles.mainContainer}>
            <p className={styles.remove}>
                <button style={{background: "none"}} className={styles.button} value={id} onClick={removeItem}>x</button>
            </p>
            <img className={styles.image} src={image}/>
            <NavLink to={`/home/${id}`}>
                <p className={styles.name}>{name}</p>
            </NavLink>
            <p className={styles.price}>US {price}</p>
            <button value="add" className={styles.add} onClick={addItemToCart}>
                ADD TO CART
            </button>
        </div>
    )
}

export default FavoriteCard;