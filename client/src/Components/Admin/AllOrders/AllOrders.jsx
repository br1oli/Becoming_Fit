import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AllOrders.module.css"
import OrderItem from "./OrderItem"
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAdmin } from "../../../Redux/Actions/AdminActions"

const AllOrders = ( ) => {
    const dispatch = useDispatch();
    const adminOrders = useSelector((state) => state.adminOrders);

    console.log(adminOrders);

    useEffect(() => {
        const getOrders = async () => {
            await dispatch(getAllOrdersAdmin());
        }
        getOrders();
    },[])


    return(
        <div>

            <div className={styles.mainContainer}>
                {
                    adminOrders?.length  ? (

                     <div>
                        <div className={styles.titleDiv}>
                            <h2 className={styles.title}>ORDERS</h2>
                     </div>

                        <div className={styles.cardsContainer}>
                            { 
                                adminOrders.length && adminOrders?.map((order, index) => (
                                    <OrderItem key={index} data={order} />
                                ))
                            }
                        </div>

                    </div>
                ) : <div>
                        <p className={styles.title}>ORDERS</p> <br/><br/><br/><br/>
                        <p className={styles.items}>0 ITEMS</p><br/>

                        <p className={styles.items}>No orders registered</p> <br/>    
                    </div> 
                }
            </div>

        </div>
    )
};

export default AllOrders;