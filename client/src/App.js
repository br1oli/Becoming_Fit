import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import { RegisterForm } from "./Components/RegisterForm";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import ProductDetail from "./Components/ProductDetail";
import { useDispatch } from "react-redux";
import { getProducts } from "./Redux/Actions/UsersActions";
import ProductForm from "./Pages/ProductForm";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <BrowserRouter>
      {/* <Switch> */}
        <NavBar/>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:id" render={(props)=><ProductDetail props={props}/>}/>
        <Route exact path= "/register" component={RegisterForm} />
        <Route exact path= "/productForm" component={ProductForm} />
        <Footer/>
      {/* </Switch> */}
    </BrowserRouter>
  );
}

export default App;
