import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./FavoriteCard.module.css";
import { removeOneProductFromFavorites, addToCart } from "../../Redux/Actions/UsersActions"


const FavoriteCard = ( {data, favoriteId} ) => {
    const dispatch = useDispatch();

    const removeItem = (e) => {
        e.preventDefault()
            dispatch(removeOneProductFromFavorites(favoriteId));
    }

    const addItemToCart = (e) => {
        e.preventDefault()
        dispatch(addToCart(data?.id))
    }

    return (
        <div className={styles.mainContainer}>
            <p className={styles.remove}>
                <button style={{background: "none"}} className={styles.button} value={data?.id} onClick={removeItem}>x</button>
            </p>
            <img className={styles.image} src={data?.image}/>
            <NavLink to={`/home/${data?.id}`}>
                <p className={styles.name}>{data?.name}</p>
            </NavLink>
            <p className={styles.price}>US {data?.price}</p>
            <button value="add" className={styles.add} onClick={addItemToCart}>
                ADD TO CART
            </button>
        </div>
    )
}

export default FavoriteCard;