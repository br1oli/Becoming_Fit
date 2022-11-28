import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Home.module.css";
import Footer from "../Footer/Footer";
import ProductCard from "../ProductComponents/ProductCard";
import { Pagination } from "./Pagination";
import Loading from "../../Utils/Loading.gif";
import Slider from "../Carousel/Slider";
import ImgSide from "../../Utils/ImagenSide.png";
import { getCartFromDB, postCartToDB } from "../../Redux/Actions/UsersActions";
import Filters from "../Filters/Filters.jsx";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton.jsx";

const Home = () => {
  const { currentProducts, allProducts, token, shoppingCart, userStore } =
    useSelector((state) => state);

  let dispatch = useDispatch();

  //filling the database in case the user has selected products before login
  useEffect(() => {
    const fillDBWithLocalCart = async () => {
      if (token && userStore?.email && shoppingCart.length) {
        for (let i = 0; i < shoppingCart.length; i++) {
          await dispatch(
            postCartToDB({
              userId: userStore.email,
              productId: shoppingCart[i].id,
              amount: shoppingCart[i].amount,
              color: shoppingCart[i].color,
              size: shoppingCart[i].size,
            })
          );
        }
        dispatch(getCartFromDB(userStore.email));
      }
    };
    fillDBWithLocalCart();
  }, [dispatch, token, shoppingCart, userStore]);

  return (
    <div className={Styles.homeContainer}>
      <div className={Styles.filtersContainer}>
        <Filters />
      </div>
      <div className={Styles.sliderContainer}>
        <Slider />
      </div>
      <div className={Styles.bodyContainer}>
        <div className={Styles.leftSide}>
          <img src={ImgSide} alt="not found" />
        </div>
        {allProducts.length > 0 ? (
          <div className={Styles.rightSide}>
            <div className={Styles.cardsContainer}>
              {currentProducts?.map((p) => {
                return (
                  <ProductCard
                    key={p.id}
                    name={p.name}
                    id={p.id}
                    image={p.image}
                    brand={p.brandName}
                    price={p.price}
                  />
                );
              })}
            </div>
            <div className={Styles.paginationContainer}>
              <Pagination />
            </div>
          </div>
        ) : (
          <div className={Styles.loadingContainer}>
            <img src={Loading} alt="not found" />
          </div>
        )}
      </div>
      <div className={Styles.whatsAppButton}>
        <WhatsAppButton />
      </div>
      <div className={Styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
