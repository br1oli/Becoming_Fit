import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import { RegisterForm } from "./Components/RegisterForm";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";



function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={RegisterForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
