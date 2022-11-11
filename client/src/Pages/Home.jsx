import React from "react";
import NavBar from "../COMPONENTS/NavBar";
import Footer from "../COMPONENTS/Footer";
import "../COMPONENTS/Style/Home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const productos = useSelector((state) => state.products.allProducts);

  return (
    <div className={Styles.homeContainer}>
      <div className="nav.container">
        <NavBar />
      </div>
      <div className="filters-container">
        <Filters />
      </div>
      <div className="cards-container">
        <h2>CARDS</h2>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
