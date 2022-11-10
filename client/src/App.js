import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./COMPONENTS/LandingPage.jsx";
import { CreateVideogame } from "./COMPONENTS/LoginForm";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/form" component={CreateVideogame} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
