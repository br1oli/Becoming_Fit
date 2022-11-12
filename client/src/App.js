import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";


function App() {

  return (
    <BrowserRouter>
      {/* <Switch> */}
        <NavBar/>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Footer/>
      {/* </Switch> */}
    </BrowserRouter>
  );
}

export default App;
