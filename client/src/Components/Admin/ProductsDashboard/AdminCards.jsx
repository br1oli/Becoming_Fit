import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProductDetail, deleteProduct, changeProductStock } from "../../../Redux/Actions/UsersActions";
import Styles from './AdminCards.module.css'

const AdminCards = (props) => {
    let dispatch = useDispatch();
    let history = useHistory();

    const handleEditProduct = (e) => {
        dispatch(getProductDetail(e.target.value))
        setTimeout(() => {
          history.push("/admin/products/edit") 
        }, 1000)        
    }

    const handleDeleteProduct = async (e) => {
      if (props.isDeleted === false) {
        if (window.confirm("Are you sure you want to delete this product from the customers list?")) {
          dispatch(deleteProduct({id: e.target.value, changeDeleteState: true}));          
          window.location.reload()
        }
      } else if (props.isDeleted === true) {
        if (window.confirm("Are you sure you want to add this product from the customers list?")) {
          dispatch(deleteProduct({id: e.target.value, changeDeleteState: false}));          
          window.location.reload()
        }
      }        
    }

    const handleChangeStock = (e) => {
      if (props.outOfStock === false) {
        dispatch(changeProductStock({id: e.target.value, changeStock: true}))
        window.location.reload()
      } else {
      if (props.outOfStock === true) {
        dispatch(changeProductStock({id: e.target.value, changeStock: false}))
        window.location.reload()
        }
      }
    }


  return (
    <div className={Styles.fullContainer}>
      <div className={Styles.cardContainer}>
        <div className={Styles.imgContainer}>
            <img
              src={props.image}
              alt="img not found"
              className={Styles.imageCard}
            />
        </div>

        <div className={Styles.cardContent}>
          <div className={Styles.nameContainer}>
            <h6 className={Styles.name}>{props.name}</h6>
          </div>

          <div className={Styles.priceContainer}>
            <span className={Styles.price}>U${props.price} </span>
            {props.outOfStock === false ? <p>Available Stock</p> : <p>Out of Stock</p>}
          </div>
        </div>

        <div className={Styles.buttonsContainer}>

        <div className={Styles.buttonBox}>
              <button
                  value={props.id}
                  onClick={handleChangeStock}
                  className={Styles.button}
              >
                  STOCK
              </button>
          </div>

          
          <div className={Styles.buttonBox}>
                  <button
                    value={props.id}
                    onClick={handleEditProduct}
                    className={Styles.button}
                  >
                    EDIT
                  </button>
                </div>
                <div className={Styles.buttonBox}>
                  {
                    props.isDeleted === true ? 
                    <button
                    value={props.id}
                    onClick={handleDeleteProduct}
                    className={Styles.button}
                  >
                  ADD
                  </button> :
                  <button
                  value={props.id}
                  onClick={handleDeleteProduct}
                  className={Styles.button}
                >
                  DELETE
                </button>
                }                  
                </div>
        </div>

      </div>
    </div>
  );
};

export default AdminCards;