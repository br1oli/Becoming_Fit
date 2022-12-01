import React from "react";
import styles from "./MyOrderItem.module.css";
import MyOrderDetail from "./MyOrderDetail";

const MyOrderItem = ({data}) => {
    return (
        <div>
            <div className={styles.mainContainer}>
                <h5>Products</h5>
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
                    <p style={{color: "green", fontSize: "1.3rem"}}><strong>Status: </strong>{data?.status}</p>
                    <p><strong>Address: </strong>{data?.address}</p>
                    <p><strong>Quantity: </strong>{data?.totalQuantity}</p>
                    <p>US {data?.totalToPay}</p>
                    <br/>

                    <MyOrderDetail data={data}/>
                </div>

            </div>
        </div>
    )
}

export default MyOrderItem;
