import React from "react";
import { NavLink } from "react-router-dom";
import Styles from "./ProductCard.module.css";
import { addProductToFavorites } from "../../Redux/Actions/UsersActions";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = (props) => {
  let dispatch = useDispatch();
  let userId = useSelector((state) => state.userStore.email);

  const handleFavorite = async (e) => {
    await dispatch(addProductToFavorites(e.target.value, userId));
  };

  return (
    <div className={Styles.fullContainer}>
      <div className={Styles.cardContainer}>
        <div className={Styles.imgContainer}>
          <NavLink to={`/home/${props.id}`}>
            <img
              src={props.image}
              alt="img not found"
              className={Styles.imageCard}
            />
          </NavLink>
        </div>

        <div className={Styles.cardContent}>
          <div className={Styles.nameContainer}>
            <h6 className={Styles.name}>{props.name}</h6>
          </div>

          <div className={Styles.priceContainer}>
            <span className={Styles.price}>U${props.price} </span>
          </div>
        </div>

        <div className={Styles.favButton}>
          <button value={props.id} onClick={handleFavorite} className="like">
            ADD FAVORITE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
