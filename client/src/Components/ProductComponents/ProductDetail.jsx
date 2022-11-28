import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  addToCart,
  getProductDetail,
  clearDetails,
  postCartToDB,
  addProductToFavorites,
  getCartFromDB,
  deleteFromCart,
  clearCartInDb,
} from "../../Redux/Actions/UsersActions";
import { Link, NavLink } from "react-router-dom";
import ProductCardIndex from "./ProductCard";
import NavBar from "../NavBar/NavBar";
import ProductReviews from "../Reviews/ProductReviews";
import Footer from "../Footer/Footer";
import { RadioButtonsColorGroup } from "../ShoppingCart/Size&ColorRButtons.jsx";
import { RadioButtonsSizeGroup } from "../ShoppingCart/Size&ColorRButtons.jsx";

const ProductDetail = (props) => {
  const detailId = props.props.match.params.id;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.details);
  const cartItems = useSelector((state) => state.shoppingCart);
  const cartDB = useSelector((state) => state.cartDB);
  let token = useSelector((state) => state.token);
  let userId = useSelector((state) => state.userStore.email);

  //Local states for amount, color and size
  let [selectedSize, setSelectedSize] = useState("");
  let [selectedColor, setSelectedColor] = useState("");
  let [amount, setAmount] = useState(0);

  //Finding equal product un store cart
  const productInCart = cartItems.find(
    (e) =>
      e.id === detailId &&
      selectedColor &&
      selectedSize &&
      e.color === selectedColor &&
      e.size === selectedSize
  );

  //finding equal product in cartDB store
  const productInCartDB = cartDB?.cartProducts?.find(
    (e) =>
      e.product.id === detailId &&
      selectedColor &&
      selectedSize &&
      e.color === selectedColor &&
      e.size === selectedSize
  );
  useEffect(() => {
    dispatch(getProductDetail(detailId));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, detailId]);

  //handle que se le pasa a los radiobuttons de color y size
  const handleColor = (e) => {
    e.preventDefault();
    setSelectedColor(e.target.value);
  };
  const handleSize = (e) => {
    e.preventDefault();
    setSelectedSize(e.target.value);
  };
  //handleAmount dependiendo del value
  const handleAmount = (e) => {
    e.preventDefault();
    if (e.target.value === "+") {
      setAmount(amount + 1);
    }
    if (e.target.value === "-") {
      setAmount(amount - 1);
    }
  };

  //handle de los botones del detail
  const handleChange = async (e) => {
    e.preventDefault();
    //si existe un token usa las actions que llaman a la db
    if (token.length) {
      //solo se despachan si hay un amount, color y un size
      if (selectedColor && selectedSize && amount) {
        if (e.target.value === "add") {
          await dispatch(
            postCartToDB({
              userId: userId,
              productId: detailId,
              amount: amount,
              color: selectedColor,
              size: selectedSize,
            })
          );
          dispatch(getCartFromDB(userId));
          setAmount(0);
        }
      } else {
        //cambiar alert por pop up
        return alert("Choose color and size, please.");
      }

      //si no hay un token, aca maneja el store y guarda los productos en el local storage
      //solo si hay un amount, color y un talle
    } else if (!token.length && selectedColor && selectedSize && amount) {
      if (e.target.value === "add") {
        dispatch(
          addToCart({
            id: detailId,
            size: selectedSize,
            color: selectedColor,
            amount: amount,
          })
        );
        setAmount(0);
      }
    } else {
      return alert("Choose color and size, please.");
    }
  };

  const handleFavorite = () => {
    dispatch(addProductToFavorites(detailId, userId));
  };

  return (
    <div className={styles.primaryContainer}>
      <NavBar />
      <br />
      <br />
      <br />

      <Link to={`/home`}>Go back /Home</Link>

      <div className={styles.secondaryContainer}>
        <div className={styles.image}>
          <img className={styles.img} alt={product.name} src={product.image} />
        </div>

        <div className={styles.detail}>
          <p>
            {product.gender} {product.category?.name} • Becoming Fit
          </p>

          <h2>{product.name}</h2>

          <p className={styles.rating}> ★ ★ ★ ★ ★ {product.rating}</p>

          <div className={styles.sizesDiv}>
            {product.color && product.color?.split(", ").length ? (
              <RadioButtonsColorGroup
                color={product.color}
                handleColor={handleColor}
              />
            ) : null}
          </div>
          <div className={styles.sizesDiv}>
            {product.size && product.size?.split(", ").length ? (
              <RadioButtonsSizeGroup
                size={product.size}
                handleSize={handleSize}
              />
            ) : null}
          </div>

          <p>
            Your favorite brand • <strong>{product.brand?.name}</strong>
          </p>

          <p>Cantidad</p>
          <div className={styles.cantidad}>
            <button
              onClick={handleAmount}
              value="-"
              className={styles.cantidad1}
              /* habilito el boton de menos solo si se selecciono un color un talle y cantidad mayor a 0*/
              disabled={
                selectedColor && selectedSize && amount > 0 ? false : true
              }
            >
              -
            </button>
            <p className={styles.cantidad2}>{amount}</p>
            <button
              onClick={handleAmount}
              value="+"
              className={styles.cantidad1}
            >
              +
            </button>
          </div>

          <p className={styles.oportunity}>
            Great catch! This exclusive product is now available at{" "}
            <strong>Becoming Fit</strong>, don't miss this oportunity
          </p>

          <h5 className={styles.price}> $ US {product.price}</h5>

          <div className={styles.buttons}>
            <button className={styles.add} onClick={handleChange} value="add">
              ADD TO CART
            </button>
            <button onClick={handleFavorite} className={styles.like}>
              ♥
            </button>
          </div>

          <p>Free shipping & special prices for members only</p>
        </div>
      </div>

      {/* <h3 className={styles.detailsTitle}></h3> */}
      <div className={styles.thirdContainer}>
        <div className={styles.accordion}>
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  className="accordion-button"
                  style={{ background: "black", color: "white" }}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  <strong>Description</strong>
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div className="accordion-body">
                  <h4>Description</h4>
                  {product.description}
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  className="accordion-button"
                  style={{ background: "black", color: "white" }}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  <strong>Size Guide</strong>
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div className="accordion-body">
                  <h4>How to know your size</h4>
                  <p>
                    Follow these easy steps to get the right size. For the best
                    fit, measure your feet at the end of the day.
                  </p>
                  <p>
                    <strong>1.</strong> Step on a piece of paper with your heel
                    slightly touching a wall behind. <br />
                    <strong>2.</strong> Mark the end of your longest toe on the
                    paper and measure from the wall to the marking. <br />
                    <strong>3.</strong> Do the same for the other foot and
                    compare measurements with our size chart to get the right
                    size. <br />
                  </p>
                  <img
                    alt="Size Guide"
                    src="https://esprit.vtexassets.com/assets/vtex/assets-builder/esprit.esprit-store/7.95.0/images/guia-talla-inferior___f8f868a086951dc90524ab22f8158ca1.png"
                  />
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  className="accordion-button"
                  style={{ background: "black", color: "white" }}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  <strong>Reviews</strong>
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div className="accordion-body">
                  <div className={styles.bodyReview}>
                    <ProductReviews
                      infoProduct={product}
                      idProduct={detailId}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.suggestions}>
          <h3 className={styles.title}>You may also like</h3>
          <div className={styles.divSuggestions}>
            <ProductCardIndex
              image={
                "https://http2.mlstatic.com/D_NQ_NP_750910-MLU51264755911_082022-O.webp"
              }
              name={"Adidas Essentials Jacket"}
              price={"74"}
            />
            <ProductCardIndex
              image={
                "https://http2.mlstatic.com/D_NQ_NP_750910-MLU51264755911_082022-O.webp"
              }
              name={"Adidas Essentials Jacket"}
              price={"74"}
            />
            <ProductCardIndex
              image={
                "https://http2.mlstatic.com/D_NQ_NP_750910-MLU51264755911_082022-O.webp"
              }
              name={"Adidas Essentials Jacket"}
              price={"74"}
            />
            <ProductCardIndex
              image={
                "https://http2.mlstatic.com/D_NQ_NP_750910-MLU51264755911_082022-O.webp"
              }
              name={"Adidas Essentials Jacket"}
              price={"74"}
            />
          </div>
        </div>

        <div className={styles.dealsDiv}>
          <h1 className={styles.deals}>
            Join our merbers club & get 10% off on your first purchase
          </h1>
          <NavLink className={styles.link} to={"/home/newUser"}>
            <button className={styles.join}>Join us!</button>
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
