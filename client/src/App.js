import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import ProductDetail from "./Components/ProductComponents/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./Redux/Actions/UsersActions";
import ProductForm from "./Components/ProductComponents/ProductForm";
import About from "./Components/About/About.jsx";
//AUTH0
import {useAuth0} from '@auth0/auth0-react'
import LoginButton from "./Components/Auth/LoginButton";
import Profile from "./Components/Auth/user-info";
import LogoutButton from "./Components/Auth/LogoutButton";

import FiltersSideBar from "./Components/NavBar/FiltersSideBar";

function App() {
  const dispatch = useDispatch();
  const {isLoading, isAuthenticated} = useAuth0()
  const allProducts = useSelector((state) => state.allProducts);
  useEffect(() => {
    if (!allProducts.length) {
      dispatch(getProducts());
    }
  }, []);

  return (
    <BrowserRouter>


      {/* <Route exact path="/signin" component={Login} /> */}
      {/* <Route exact path="/signup" component={Registrando} /> */}

      {isAuthenticated? <LogoutButton/>:<LoginButton/>} 
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/home" component={NavBar} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route
        exact
        path="/home/:id"
        render={(props) => <ProductDetail props={props} />}
      />
      <Route exact path="/productForm" component={ProductForm} />
      <Route exact path="/contact" component={About} />

      {/* <Route exact path="/signin" component={Login} /> */}
    </BrowserRouter>
  );
}

export default App;
