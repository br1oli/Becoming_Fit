import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductReviews.module.css"
import ReviewForm from "./ReviewForm";
import { getReviews, editReviews, removeReviews } from "../../Redux/Actions/UsersActions"
import { useAuth0 } from "@auth0/auth0-react";

const ProductReviews = ({ idProduct, infoProduct }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth0();
    const auth = useSelector((state) => state.token);
    let userId = JSON.parse(sessionStorage.getItem("userId"));
    const [ isReviewAvailable, setIsReviewAvailable ] = useState(false)

    useEffect(()=>{
        dispatch(getReviews());
        setIsReviewAvailable(isAuthenticated)
        console.log("USER INFO", user, isAuthenticated);
    },[])

    // useEffect(()=> {
        
    // },[isAuthenticated])

    //MaterialUI Modal Form
    const handleEdit = () => {
        dispatch(editReviews())
    }
    const handleDelete = () => {
        dispatch(removeReviews())
    }


    const averageFunction = () => {
        let total = 0 
        const sum = infoProduct.review.map((review) => total += review.rating)
        const average = sum / infoProduct.review.length
    }

    return(
        <div className={styles.mainContainer}>           
        <h3><strong>Reviews</strong></h3>

        {
            infoProduct.reviews?.length > 0 ? (
                <div>
                <div className={styles.filledReview}>

                    <div className={styles.overallReview}>

                        <h6><strong>Overall</strong></h6>
                        {
                            infoProduct.reviews.length === 1 ? (<p> 1 review</p>) : (<p> {infoProduct.reviews.length} reviews</p>)
                        }
                        
                        <div className={styles.overallRating}>
                            <p>Rating </p>
                            <p> ★ ★ ★ ★ ★ </p>
                        </div>

                        <div className={styles.overallQuality}>
                            <p>Quality </p>
                            <p> ★ ★ ★ ★ ★ </p>
                        </div>

                    </div>

                    <div className={styles.eachReview}>
                        <p><strong>Comments</strong></p>
                        {
                            infoProduct.reviews.map((review, index) => {
                                return (
                                    <div className={styles.divReview} key={index}>
        
                                        <div className={styles.heading}>
                                            <h5><strong>{review.title}</strong></h5>
                                            <div>
                                                <button style={{magin: "none"}} className={styles.edit} onClick={handleEdit}>Edit</button> <button className={styles.delete} onClick={handleDelete}>x</button><br/>
                                            </div>
                                        </div>
                                        <p>Reviewed by "User Name"{review.userId}</p>

                                        <p><strong>Rating</strong></p>
                                        <p> ★ ★ ★ ★ ★ {review.rating}</p>
                                        
                                        <p> <strong>Review</strong></p>
                                        <p>{review.comment}</p>
                                        <p><strong>Quality</strong></p>
                                        <p>★ ★ ★ ★ ★{review.quality}</p>
                                        
                                    </div>
                                );
                            })
                        } 
                    </div>

                </div>
                {
                    isReviewAvailable ? (
                        <ReviewForm  idProduct={idProduct}/>
                    ) : (
                        <p>You need to be authenticated to write a review</p>
                    )
                }
                </div>
            ) : 
            (
                <div className={styles.emptyReview}>
                        <p>There is not reviews for this product yet</p><br/>

                        {
                            isReviewAvailable ? (
                                <ReviewForm  idProduct={idProduct}/>
                            ) : (
                                <p>You need to be authenticated to write a review</p>
                            )
                        }
                </div>
            )
        }
        </div>
    )
};

export default ProductReviews;