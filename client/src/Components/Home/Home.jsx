import React from "react";
import { useSelector } from "react-redux";
import Styles from "./Home.module.css";
import Filters from "../Filters/Filters";
import ProductCard from "../ProductComponents/ProductCard";
import { Pagination } from "./Pagination";

const Home = () => {
  const { currentProducts, allProducts } = useSelector((state) => state);

  return (
    <div className={Styles.homeContainer}>
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
