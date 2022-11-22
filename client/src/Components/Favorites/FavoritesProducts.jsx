import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteCard from "./FavoritesCard";
import { Link, NavLink } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
import styles from "./FavoriteProduct.module.css";
import { removeAllProductsFromFavorites, getProductFromFavorites } from "../../Redux/Actions/UsersActions"
import ProductCard from "../ProductComponents/ProductCard"
import { useEffect } from "react";
import Footer from "../Footer/Footer";

const FavoritesProducts = ({favorites}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductFromFavorites())
    },[])

    const clearFavorites = (e) => {
        e.preventDefault()
        dispatch(removeAllProductsFromFavorites());
    }

    return (
        <div >
             <NavBar/>
            <div className={styles.mainContainer}>
                {
                favorites?.length ? (
                    <div>
                        <Link to={`/home`}>Go back /Home</Link>
                        <div className={styles.titleDiv}>
                            <p className={styles.title}>MY WISHLIST</p>
                            <button onClick={clearFavorites} className={styles.button}>
                                Remove all
                            </button>
                        </div>

                        
                      
                        <p className={styles.items}>
                            {favorites?.length} Items
                        </p>

                        <div className={styles.cardsContainer}>
                            { 
                                favorites?.map((e, index) => (
                                    <FavoriteCard key={index} favoriteId={e.id} data={e.product} />
                                ))
                            }
                        </div>

                    </div>
                ) : <div>
                        <p className={styles.title}>MY WISHLIST</p> <br/><br/><br/><br/>
                        <p className={styles.items}>0 ITEMS</p><br/>

                        <p className={styles.items}>You have not added any products to the list yet.</p> <br/>
                        <p className={styles.exploring}><Link to="/home">Continue exploring</Link></p>     
                    </div> 
                }
            </div>

            <div className={styles.dealsDiv}>
            <h1 className={styles.deals}>
                Join our merbers club & get 10% off on your first purchase
            </h1>
            <NavLink className={styles.link} to={"/home/newUser"}>
                <button className={styles.join}>Join us!</button>
            </NavLink>
            </div>
            <Footer/>
        </div>
           

    )
};

export default FavoritesProducts;