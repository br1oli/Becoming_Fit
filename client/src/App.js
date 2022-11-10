

import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./Components/LandingPage";
import NavBar from './navBar/NavBar';
import Footer from './Components/Footer/Footer';
import ProductCard from './Components/ProductCards/ProductCardsindex';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      {/* <Route exact path="/" component={LandingPage} /> */}
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={ProductCard} />
       <Route path='/' component={Footer} />
    </Switch>
  </BrowserRouter>
 );
}


export default App;
