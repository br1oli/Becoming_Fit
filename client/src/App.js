import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import { RegisterForm } from "./Components/RegisterForm";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import ProductDetail from "./Components/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./Redux/Actions/UsersActions";
import ProductForm from "./Pages/ProductForm";
import { StylesContext } from "@material-ui/styles";
import About from "./Components/About.jsx";

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
      {/* <Switch> */}
     
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
      {/* </Switch> */}
    </BrowserRouter>
  );
}

export default App;
