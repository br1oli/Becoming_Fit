import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import { RegisterForm } from "./Components/UserComponents/RegisterForm";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import ProductDetail from "./Components/ProductComponents/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./Redux/Actions/UsersActions";
import ProductForm from "./Components/ProductComponents/ProductForm";
import About from "./Components/About/About.jsx";
import PruebaLanding from "./Components/PruebaLanding.jsx";

function App() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  useEffect(() => {
    if (!allProducts.length) {
      dispatch(getProducts());
    }
  }, []);

  return (
    <BrowserRouter>
      <Route exact path="/landingPrueba" component={PruebaLanding} />
      <Route exact path="/home" component={NavBar} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route
        exact
        path="/home/:id"
        render={(props) => <ProductDetail props={props} />}
      />
      <Route exact path="/register" component={RegisterForm} />
      <Route exact path="/productForm" component={ProductForm} />
      <Route exact path="/contact" component={About} />

      <Footer />
    </BrowserRouter>
  );
}

export default App;
