import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./MyOrderItem.module.css";


const MyOrderItem = ({data}) => {

    return (
        <div>
            <div className={styles.mainContainer}>

                <div className={styles.itemContainer}>  
                    { 
                        data?.purchasedProducts.map((products, index) => (
                            <div key={index}>
                                <img src={products.product.image}/>
                                <p>{products.product.name}</p>
                                <p>{products.size}</p>
                                <p>{products.color}</p>
                            </div>
                        ))
                    }
                </div>


                <div className={styles.orderInfo}>
                    <p>{data?.status}</p>
                    <p className={styles.name}>{data?.name}</p>
                    <p>{data?.address}</p>
                    <p>{data?.totalQuantity}</p>
                    <p className={styles.price}>US {data?.totalToPay}</p>

                    <NavLink to={`/order/${data?.id}`}>
                        <button value="add" className={styles.add}>
                            GO TO DETAIL
                        </button>
                    </NavLink>

                </div>

            </div>
        </div>
    )
}

export default MyOrderItem;
