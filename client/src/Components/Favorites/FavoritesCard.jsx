import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./FavoriteCard.module.css";
import { removeOneProductFromFavorites } from "../../Redux/Actions/UsersActions"


const FavoriteCard = ( {data, favoriteId} ) => {
    const dispatch = useDispatch();

    const removeItem = (e) => {
        e.preventDefault()
            dispatch(removeOneProductFromFavorites(favoriteId));
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
        </div>
    )
}

export default FavoriteCard;