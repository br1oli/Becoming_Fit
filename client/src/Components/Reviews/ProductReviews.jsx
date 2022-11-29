import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductReviews.module.css"
import ReviewForm from "./ReviewForm";
import { editReviews, removeOneReview } from "../../Redux/Actions/UsersActions"
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
//Material UI
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ProductReviews = ({ idProduct, infoProduct }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth0();
    const auth = useSelector((state) => state.token);
    const [ isReviewAvailable, setIsReviewAvailable ] = useState(false)
    const idReview = useSelector((state) => state.reviews);
    //const userName = user.name
    //console.log(user.name);

    useEffect(()=>{
        setIsReviewAvailable(isAuthenticated)
    },[]);

    //MaterialUI Modal Form
    const handleEdit = () => {
        dispatch(editReviews())
    };
    const handleDelete = (e) => {
        dispatch(removeOneReview(e.target.value))
        window.location.reload()
    };

     //Material UI Options
     const options = [
        'None',
        'Atria',
        'Callisto',
        'Dione'
      ];
      
      const ITEM_HEIGHT = 48;
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

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
                                infoProduct.reviews.length === 1 ? 
                                (<p> 1 review</p>) : 
                                (<p> {infoProduct.reviews.length} reviews</p>)
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

                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                
                                                <Menu
                                                    id="long-menu"
                                                    MenuListProps={{
                                                    'aria-labelledby': 'long-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    PaperProps={{
                                                    style: {
                                                        maxHeight: ITEM_HEIGHT * 4.5,
                                                        width: '20ch',
                                                    },
                                                }}
                                                >
                                                    <button style={{magin: "none"}} className={styles.edit} onClick={handleEdit}>Edit</button>
                                                    <button className={styles.delete} value={review.id} onClick={handleDelete}>x</button><br/>
                                                </Menu>                                           
                                                </div>
                                            </div>
                                            <p>Reviewed by {user?.given_name}</p>

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
                <ReviewForm  idProduct={idProduct}/>
                <Link to={"/mail"}>Mailing</Link>
                <Link to={"/myOrders"}>My Orders</Link>
                </div>
            ) : 
            (
                <div className={styles.emptyReview}>
                    <p>There is not reviews for this product yet</p><br/>

                    <ReviewForm  idProduct={idProduct}/>
                    <Link to={"/mail"}>Mailing</Link>
                    <Link to={"/myOrders"}>My Orders</Link>
                </div>
            )
        }
        </div>
    )
};

export default ProductReviews;