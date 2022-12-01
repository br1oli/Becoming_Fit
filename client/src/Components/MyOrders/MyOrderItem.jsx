import React from "react";
import styles from "./MyOrderItem.module.css";
import MyOrderDetail from "./MyOrderDetail";

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
                    <br/>

                    <MyOrderDetail data={data}/>
                </div>

            </div>
        </div>
    )
}

export default MyOrderItem;
