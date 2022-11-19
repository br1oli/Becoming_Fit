import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import ProductDetail from "./Components/ProductComponents/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./Redux/Actions/UsersActions";
import ProductForm from "./Components/ProductComponents/ProductForm";
import About from "./Components/About/About.jsx";

import Login from "./Components/UserComponents/Login";
import Registrando from "./Components/UserComponents/Registrando";
import RegisterForm from './Components/UserComponents/RegisterForm';
import Carousel from "./Components/Carousel/Carousel.jsx";

//AUTH0
import {useAuth0} from '@auth0/auth0-react'
import LoginButton from "./Components/Auth/LoginButton";
import Profile from "./Components/Auth/user-info";
import LogoutButton from "./Components/Auth/LogoutButton";


function App(props) {

  const dispatch = useDispatch();
  const {isLoading, isAuthenticated} = useAuth0()
  const allProducts = useSelector((state) => state.allProducts);
  useEffect(() => {
    if (!allProducts.length) {
      dispatch(getProducts());
    }
  }, []);

  return (


    <Routes>    
     {isAuthenticated? <LogoutButton/>:<LoginButton/>}
     <Route exact path="/profile" element={<Profile />}/>
     
     
      <Route exact path="/carousel" element={<Carousel />} />
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/home" element={<Home />} />
{/*       <Route exact path="/productForm" element={<ProductForm />} />
 */}      <Route exact path="/contact" element={<About />} />

      <Route exact path="/home/:id" render={(props) => <ProductDetail id={props} />}/>

    </Routes>
  );
}

export default App;
