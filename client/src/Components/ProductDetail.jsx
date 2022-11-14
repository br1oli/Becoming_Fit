import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Style/ProductDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { addToCart, getProductDetail, clearDetails } from "../Redux/Actions/UsersActions";
import { Link, NavLink } from "react-router-dom";
import ProductCardIndex from "./ProductCardsindex"


const ProductDetail = (props) => {
  const detailId = props.props.match.params.id;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.details);
  useEffect(() => {
    dispatch(getProductDetail(detailId));
     
    return () => {
        dispatch(clearDetails())
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(addToCart(detailId));
  };
  return(
    <div className={styles.primaryContainer}>
        <br/><br/><br/>

        <Link to={`/home`}>Go back /Home</Link>

        <div className={styles.secondaryContainer}>

            <div className={styles.image}><img className={styles.img} alt={product.name} src={product.image}/></div>

            <div className={styles.detail}>

                <p>{product.gender} {product.category?.name} • Becoming Fit</p>

                <h2>{product.name}</h2>

                <p className={styles.rating}> ★ ★ ★ ★ ★ {product.rating}</p>
                
                <p>Choose a color</p>
                <p><strong>{product.color}</strong></p>
                <img className={styles.imgColor} alt={product.name} src={product.image}/>

                <p>Yor favorite brand   •   <strong>{product.brand?.name}</strong></p>

                    <div className={styles.sizesDiv}>
                        <select className={styles.sizes}>
                            <option value="all">Sizes</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <p>Size Guide</p>
                    </div>

                    <p>Cantidad</p>
                    <div className={styles.cantidad}>
                        <p className={styles.cantidad1}>-</p>
                        <p className={styles.cantidad2}>1</p>
                        <p className={styles.cantidad1}>+</p>
                    </div>

                   
                    <p className={styles.oportunity}>Great catch! This exclusive product is now available at <strong>Becoming Fit</strong>, don't miss this oportunity</p>

                    <h5 className={styles.price}> $ US  {product.price}</h5>

                    <div className={styles.buttons}>
                        <button className={styles.add} onClick={handleChange}>ADD TO CART</button>
                        <button className={styles.like}>♥</button>
                    </div>

                <p>Free shipping & special prices for members only</p>
            </div>

        </div>


        <h3 className={styles.detailsTitle}></h3>
        <div className={styles.thirdContainer}>
            <div className={styles.accordion}>
                <div className="accordion" id="accordionPanelsStayOpenExample">

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                <strong>Description</strong> 
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                                <h4>Description</h4>
                                {product.description}
                            </div>
                        </div>
                    </div>


                    <div class="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            <strong>Size Guide</strong> 
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                            <h4>How to know your size</h4> 
                            <p>Follow these easy steps to get the right size. For the best fit, measure your feet at the end of the day.</p>
                                <p>
                                    <strong>1.</strong> Step on a piece of paper with your heel slightly touching a wall behind. <br/>
                                    <strong>2.</strong> Mark the end of your longest toe on the paper and measure from the wall to the marking.  <br/>
                                    <strong>3.</strong> Do the same for the other foot and compare measurements with our size chart to get the right size.  <br/>
                                </p>
                                <img alt="Size Guide" src="https://esprit.vtexassets.com/assets/vtex/assets-builder/esprit.esprit-store/7.95.0/images/guia-talla-inferior___f8f868a086951dc90524ab22f8158ca1.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <h3 className={styles.title}>Review this product</h3>
            <div className={styles.review}>

                <div className={styles.rangeContainer}>
                    <label for="exampleFormControlInput1" className="form-label"> <strong>Rate this product</strong></label>
                    <input type="range" className={styles.range} min="0" max="5" step="any"/>
                    </div>
                    <div class="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Add a short description of the product base on your experience</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write your review here"></textarea>
                    <button type="submit" className={styles.buttonReview}>Add Review</button>
                </div>

            </div>

            <div className={styles.suggestions}>
                <h3 className={styles.title}>You may also like</h3>
                <div className={styles.divSuggestions}>
                    <ProductCardIndex 
                        image={"https://http2.mlstatic.com/D_NQ_NP_750910-MLU51264755911_082022-O.webp"} 
                        name={"Adidas Essentials Jacket"} 
                        price={"74"}/>
                    <ProductCardIndex 
                        image={"https://http2.mlstatic.com/D_NQ_NP_750910-MLU51264755911_082022-O.webp"} 
                        name={"Adidas Essentials Jacket"} 
                        price={"74"}/>
                    <ProductCardIndex 
                        image={"https://http2.mlstatic.com/D_NQ_NP_750910-MLU51264755911_082022-O.webp"} 
                        name={"Adidas Essentials Jacket"} 
                        price={"74"}/>
                    <ProductCardIndex
                        image={"https://http2.mlstatic.com/D_NQ_NP_750910-MLU51264755911_082022-O.webp"} 
                        name={"Adidas Essentials Jacket"} 
                        price={"74"}/>
                </div>
            </div>

            <div className={styles.dealsDiv}>
                <h1 className={styles.deals}>Join our merbers club & get 10% off on your first purchase</h1>
                <NavLink className={styles.link} to={"/home/newUser"}><button className={styles.join}>Join us!</button></NavLink>
            </div>

        </div> 
        

    </div>
);
};

export default ProductDetail;
