import "./App.css";
import React, {useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import Home from "./Pages/Home";
import { getAllProducts } from "./Redux/Actions/Actions";
import { useDispatch } from "react-redux";

function App() {

  let dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getAllProducts());
  },[])
  
  // useEffect(() => {
  //   const response = async () => {

  //     await getAllProducts();
  //   }
  //   response();
  // }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
