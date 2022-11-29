import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./MyOrderItem.module.css";


const MyOrderItem = () => {
    const dispatch = useDispatch();
    const hardCode = {
        "name": "Jacket Reebok Accelerate Negro",
        "category": "Jacket",
        "type": "All-around",
        "gender": "Male",
        "size": ["XS", "S", "XL", "2XL"],
        "color": { "color1": "black" },
        "brand": "Nike",
        "rating": 4,
        "description": "Made with soft fleece fabric for warmth and comfort. Fleece fabric for extra softness and warmth on the inside. Full zipper and hood for adjustable protection. Front pockets for storage of small items.",
        "price": "66",
        "image": "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/19401b59f0ff487699dfae76012d9e7b_9366/Gorra_Trifolio_Baseball_(UNISEX)_Beige_HL9326_01_standard.jpg"
      }



    return (
        <div>
            <div className={styles.mainContainer}>
                
                <img className={styles.image} src={hardCode.image}/>
                    <p className={styles.name}>{hardCode.name}</p>
                <p className={styles.price}>US {hardCode.price}</p>

                <NavLink to={`/home/${hardCode.id}`}>
                    <button value="add" className={styles.add}>
                        GO TO DETAIL
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default MyOrderItem;