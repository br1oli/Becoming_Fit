
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./COMPONENTS/LandingPage";
import Footer from './COMPONENTS/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
         <Route path='/' component={Footer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
