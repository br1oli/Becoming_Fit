import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import { RegisterForm } from "./Components/RegisterForm";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import ProductDetail from "./Components/ProductDetail";



function App() {

  return (
    <BrowserRouter>
      {/* <Switch> */}
        <NavBar/>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:id" render={(props)=><ProductDetail props={props}/>}/>
        <Footer/>
      {/* </Switch> */}
    </BrowserRouter>
  );
}

export default App;
