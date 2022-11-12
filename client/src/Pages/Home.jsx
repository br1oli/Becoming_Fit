import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

//import "../Components/Style/Home.css";
import Filters from "../Components/Filters";
import Styles from "../Components/Style/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Components/ProductCardsindex";
import { getAllProducts } from "../Redux/Actions/Actions";
import { NavLink } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const productos = useSelector((state) => state.allProducts);

  return (
    <div className={Styles.homeContainer}>
      {/* <div className="nav.container">
        <NavBar />
      </div> */}
      <div className="filters-container">
        <Filters />
      </div>
      <div className="cards-container">
        <div className={Styles.cardsContainer}>
          {productos &&
            productos.map((p) => {
              console.log(productos, "Products Home");
              return (
                <div>
                  <NavLink
                    //  style={{
                    //     textDecoration: 'none',
                    //     textDecorationColor: "black",
                    //     color: 'black'
                    // }}
                    to={`/home/${p.id}`}
                  >
                    <ProductCard
                      name={p.name}
                      id={p.id}
                      image={p.image}
                      brand={p.brandName}
                      price={p.price}
                    />
                  </NavLink>
                </div>
              );
            })}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
