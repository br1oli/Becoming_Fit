import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Home.module.css";
import Filters from "../Filters/Filters";
import ProductCard from "../ProductComponents/ProductCard";
import { Pagination } from "./Pagination";
import LogoutButton from "../Auth/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "../../Redux/Actions/UsersActions";

const Home = () => {
  const { currentProducts, allProducts, userStore } = useSelector(
    (state) => state
  );
  const { user, isAuthenticated } = useAuth0();
  let dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated === true && user !== undefined) {
      dispatch(createUser(user.email));
    }
  }, [dispatch, isAuthenticated, user]);

  return (
    <div className={Styles.homeContainer}>
      <div className={Styles.leftSide}>
        <div className={Styles.filtersContainer}>
          <LogoutButton />
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
