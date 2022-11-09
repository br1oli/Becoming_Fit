

import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./COMPONENTS/LandingPage";
import NavBar from './navBar/NavBar';
import Footer from './COMPONENTS/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={NavBar} />
       <Route path='/' component={Footer} />
    </Switch>
  </BrowserRouter>
  );
}


export default App;
