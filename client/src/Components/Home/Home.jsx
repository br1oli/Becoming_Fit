import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Home.module.css";
import Footer from "../Footer/Footer";
import ProductCard from "../ProductComponents/ProductCard";
import { Pagination } from "./Pagination";
import Loading from "../../Utils/Loading.gif";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "../../Redux/Actions/UsersActions";

const Home = () => {
  const { currentProducts, allProducts } = useSelector((state) => state);
  const { user, isAuthenticated } = useAuth0();
  let dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated === true && user !== undefined) {
      dispatch(createUser(user.email));
    }
  }, [dispatch, isAuthenticated, user]);

  return (
    <div className={Styles.homeContainer}>
      {/* <div className={Styles.leftSide}></div> */}

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
        <div className={Styles.loadingContainer}>
          <img src={Loading} alt="not found" />
        </div>
      )}
      <div className={Styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
