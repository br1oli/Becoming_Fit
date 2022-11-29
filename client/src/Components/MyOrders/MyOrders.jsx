import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./MyOrders.module.css"
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import MyOrderItem from "./MyOrderItem";

const MyOrders = ( ) => {
    const favorites = [1,2]
    return(
        <div>
            <NavBar/>

            <div className={styles.mainContainer}>
                {
                    
                    favorites?.length ? (

                     <div>
                        <Link to={`/home`}>Go back /Home</Link>
                        <div className={styles.titleDiv}>
                            <p className={styles.title}>MY ORDERS</p>
                     </div>
                            <MyOrderItem/>

                        <div className={styles.cardsContainer}>
                            { 
                                favorites?.map((e, index) => (
                                    <MyOrderItem key={index} favoriteId={e.id} data={e.product} />
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