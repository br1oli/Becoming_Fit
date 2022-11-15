import React, { useEffect } from "react";

import Filters from "../Components/Filters";
import Styles from "../Components/Style/Home.module.css";
import { useSelector } from "react-redux";
import ProductCard from "../Components/ProductCardsindex";
import { getProducts } from "../Redux/Actions/UsersActions";
import { Pagination } from "../Components/Pagination";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

const Home = () => {
  const { currentProducts, allProducts } = useSelector((state) => state);

  return (
    <div className={Styles.homeContainer}>
      {/* <div className="nav.container">
        <NavBar />
      </div> */}

      <div className={Styles.leftSide}>
        <div className={Styles.filtersContainer}>
          <Filters />
        </div>
      </div>

      {allProducts.length > 0 ? (
        <div className={Styles.rightSide}>
          <div className={Styles.paginationContainer}>
            <Pagination />
          </div>

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
        </div>
      ) : (
        <>
          <h1 className={Styles.loadingTitle}>Loading...</h1>
          <div className={Styles.loading}></div>
        </>
      )}
    </div>
  );
};

export default Home;
