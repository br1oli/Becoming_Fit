import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
//import "../Components/Style/Home.css";
import Filters from "../Components/FIlters";
import Styles from "../Components/Style/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Components/ProductCardsindex";
import { getAllProducts } from "../Redux/Actions/Actions";
import { products } from "../Redux/Reducer/products";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const productos = useSelector((state) => state.products);

  return (
    <div className={Styles.homeContainer}>
      <div className="nav.container">
        <NavBar />
      </div>
      <div className="filters-container">
        <Filters />
      </div>
      <div className="cards-container">
        <div className={Styles.cardsContainer}>
          {productos &&
            productos.map((p) => {
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
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
