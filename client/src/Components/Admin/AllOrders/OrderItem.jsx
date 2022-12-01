import React from "react";
import styles from "./OrderItem.module.css";

const OrderItem = ({data}) => {

    return (
        <div>
            <div className={styles.mainContainer}>
                <h5>User</h5>
                <h6>{data?.userEmail}</h6>

                <div className={styles.itemContainer}>  
                    { 
                        data?.purchasedProducts.map((products, index) => (
                            <div key={index}>
                                <p> <strong>Product Name:</strong>  {products.product.name}</p>
                            </div>
                        ))
                    }
                </div>


                <div className={styles.orderInfo}>
                    <p><strong>Status: </strong>{data?.status}</p>
                    <br/>

                    {/* <MyOrderDetail data={data}/> */}
                </div>

            </div>
        </div>
    )
}

export default OrderItem;