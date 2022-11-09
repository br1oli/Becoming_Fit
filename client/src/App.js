
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./COMPONENTS/LandingPage";
import Footer from './COMPONENTS/Footer/Footer';
import Search from './COMPONENTS/LandingPage/Search';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Search} />
         <Route path='/' component={Footer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
