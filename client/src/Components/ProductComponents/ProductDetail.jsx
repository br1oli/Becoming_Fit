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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
      <div className={styles.navContainer}>
        <NavBar />
      </div>

      <div className={styles.secondaryContainer}>
        <div className={styles.divLeft}>
          <div className={styles.image}>
            <img
              className={styles.img}
              alt={product.name}
              src={product.image}
            />
          </div>

          <div className={styles.decriptionSize}>
            <div className={styles.description}>
              <h4>Description</h4>
              <hr />
              {product.description}
            </div>

            <div className={styles.size}>
              <h4>How to know your size</h4>
              <hr />
              <p>
                Follow these easy steps to get the right size. For the best fit,
                measure your feet at the end of the day.
              </p>
              <p>
                <strong>1.</strong> Step on a piece of paper with your heel
                slightly touching a wall behind. <br />
                <strong>2.</strong> Mark the end of your longest toe on the
                paper and measure from the wall to the marking. <br />
                <strong>3.</strong> Do the same for the other foot and compare
                measurements with our size chart to get the right size. <br />
              </p>
            </div>
          </div>
        </div>

        <div className={styles.detail}>
          <p>
            {product.gender} {product.category?.name} • Becoming Fit
          </p>

          <h2>{product.name}</h2>

          <p> ★ ★ ★ ★ ★ {product.rating}</p>

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

          {product.outOfStock === false ? (
            <div className={styles.buttons}>
              <button className={styles.add} onClick={handleChange} value="add">
                ADD TO CART
              </button>
              <button onClick={handleFavorite} className={styles.add}>
                ADD FAVORITE
              </button>
            </div>
          ) : (
            <p>Out of Stock</p>
          )}

          <p className={styles.shippinhFree}>
            Free shipping & special prices for members only
          </p>
        </div>

        <div className={styles.reviewContainer}>
          <div className={styles.reviewTitle}>
            <span>REVIEWS</span>
          </div>
          <div className={styles.bodyReview}>
            <ProductReviews infoProduct={product} idProduct={detailId} />
          </div>
        </div>
      </div>

      <div className={styles.accordionsResponsive}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{product.description}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>How to know your size</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>
                Follow these easy steps to get the right size. For the best fit,
                measure your feet at the end of the day.
              </p>
              <p>
                <strong>1.</strong> Step on a piece of paper with your heel
                slightly touching a wall behind. <br />
                <strong>2.</strong> Mark the end of your longest toe on the
                paper and measure from the wall to the marking. <br />
                <strong>3.</strong> Do the same for the other foot and compare
                measurements with our size chart to get the right size. <br />
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
