import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MyOrders.module.css"
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import MyOrderItem from "./MyOrderItem";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../Redux/Actions/UsersActions";

const MyOrders = ( ) => {
    const dispatch = useDispatch()
    const userEmail = useSelector((state) => state.userStore.email);

    useEffect(() => {
        const getOrders = async () => {
            if (userEmail) {
              await dispatch(getOrder(userEmail));
            }
        }
        getOrders();
    },[userEmail])

    const userOrders = useSelector((state) => state.userOrders)

    return(
        <div>
            <NavBar/>

            <div className={styles.mainContainer}>
                
                {
                    userOrders?.length  ? (

                     <div>
                        <Link to={`/home`}>Go back /Home</Link>
                        <div className={styles.titleDiv}>
                            <p className={styles.title}>MY ORDERS</p>
                     </div>

                        <div className={styles.cardsContainer}>
                            { 
                                userOrders.length && userOrders?.map((order, index) => (
                                    <MyOrderItem key={index} data={order} />
                                ))
                            }
                        </div>

                    </div>
                ) : <div>
                        <p className={styles.title}>MY ORDERS</p> <br/><br/><br/><br/>
                        <p className={styles.items}>0 ITEMS</p><br/>

                        <p className={styles.items}>You do not have any order registed yet</p> <br/>
                        <p className={styles.exploring}><Link to="/home">Try Your first order!</Link></p>     
                    </div> 
                }
            </div>
            <Footer/>

        </div>
    )
};

export default MyOrders;