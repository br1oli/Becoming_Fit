import React, { useEffect } from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

//import "../Components/Style/Home.css";
import Filters from "../Components/Filters";
import Styles from "../Components/Style/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Components/ProductCardsindex";
import { getProducts } from "../Redux/Actions/UsersActions";
import { Pagination } from '../Components/Pagination';

const Home = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, []);

  const { currentProducts } = useSelector((state) => state);

  return (
    <div className={Styles.homeContainer}>
      {/* <div className="nav.container">
        <NavBar />
      </div> */}
      <div className="filters-container">
        <Filters />
      </div>
      <Pagination />
      <div className="cards-container">
        <div className={Styles.cardsContainer}>
          {currentProducts?.map((p) => {
              return (
                <div key={p.id}>
                <ProductCard
                    name={p.name}
                    id={p.id}
                    image={p.image}
                    brand={p.brandName}
                    price={p.price}
                  />
                </div>
              );
            })}
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
