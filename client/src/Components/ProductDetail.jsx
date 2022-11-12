import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Style/ProductDetail.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { getProductDetail } from "../Redux/Actions/Actions";
import { Link } from "react-router-dom";

const ProductDetail = (props) => {

    const detailId = props.props.match.params.id;
    const dispatch = useDispatch();
    const product = useSelector((state) => state.details);
    useEffect(() => {
        dispatch(getProductDetail(detailId))
    },[])

    return(
        <div className={styles.primaryContainer}>
            <br/><br/><br/>
            <Link to={`/home`}>Go back</Link>

            <div className={styles.secondaryContainer}>
                <div className={styles.image}><img alt={product.name} src={product.image}/></div>

                <div className={styles.detail}>
                    <p>{product.gender} category • Becoming Fit</p>
                    <h2>{product.name}</h2>
                    <p>{product.color}</p>
                    <p>brand</p>
                        <div className={styles.sizes}>
                            <select>
                                <option value="all">Sizes</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>
                        <p> US  {product.price}</p>
                        <p> ★ ★ ★ ★ ★ {product.rating}</p>
                        <p className={styles.oportunity}>Great catch! This exclusive product is now available at <strong>Becoming Fit</strong>, don't miss this oportunity</p>
                        <div className={styles.buttons}>
                            <button className={styles.add}>ADD TO CART</button>
                            <button className={styles.like}>♥</button>
                        </div>
                    <p>Free shipping & special prices for members only</p>
                </div>

            </div>

            <div>
                <div class="accordion" id="accordionPanelsStayOpenExample">

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Description
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                {product.description}
                                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Size Details
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div class="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProductDetail;