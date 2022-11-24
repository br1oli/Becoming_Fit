import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ProductReviews.module.css"
import ReviewForm from "./ReviewForm";
import { getReviews, editReviews, removeReviews } from "../../Redux/Actions/UsersActions"
//import { editReviews } from "../../../../api/src/controllers/reviews.controllers";

const ProductReviews = ({ idProduct, infoProduct }) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getReviews());
    },[])

    const handleEdit = () => {
        dispatch(editReviews())
    }

    const handleDelete = () => {
        dispatch(removeReviews())
    }

    return(
        <div className={styles.mainContainer}>           
            <h3><strong>Reviews</strong></h3>

            {

                infoProduct.reviews?.length > 0 ? (
                    <div className={styles.filledReview}>

                        {
                            infoProduct.reviews.length === 1 ? (<p> 1 review</p>) : (<p> {infoProduct.reviews.length} reviews</p>)
                        }

                        {
                            infoProduct.reviews.map((review, index) => {
                                return (
                                    <div className={styles.divReview} key={index}>

                                        <p><strong>{review.title}</strong></p>
                                        <p>Reviewed by "User Name"{review.userId}</p><br/>

                                        <div className={styles.overallRating}>
                                            <p>Overall Rating: </p>
                                            <p> ★ ★ ★ ★ ★ {review.rating}</p>
                                        </div>
                                        <p> <strong>Review</strong></p>
                                        <p>{review.comment}</p>
                                        <p><strong>Quality</strong></p>
                                        <p>{review.quality}</p>
                                        <div className={styles.buttons}>
                                            <button onClick={handleEdit}>Edit</button> <button onClick={handleDelete}>x</button><br/>
                                        </div>
                                    </div>
                                );
                            })
                        }

                        <ReviewForm idProduct={idProduct}/>
                    </div>
                ) : 
                (
                    <div className={styles.emptyReview}>
                         <p>There is not reviews for this product yet</p><br/>

                        <ReviewForm idProduct={idProduct} className={styles.modalContainer}/>

                    </div>
                )
            }
        </div>
    )
};

export default ProductReviews;