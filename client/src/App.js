import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import ProductDetail from "./Components/ProductComponents/ProductDetail";
import { useSelector } from "react-redux";
import ProductForm from "./Components/ProductComponents/ProductForm";
import About from "./Components/About/About.jsx";
//AUTH0
import Profile from "./Components/Auth/user-info";
import FavoritesProducts from "./Components/Favorites/FavoritesProducts";

function App() {
  const favorites = useSelector((state) => state.favorites);

  return (
    <BrowserRouter>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/home" component={NavBar} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={LandingPage} />
      <Route
        exact
        path="/home/:id"
        render={(props) => <ProductDetail props={props} />}
      />
      <Route exact path="/productForm" component={ProductForm} />
      <Route exact path="/contact" component={About} />
      <Route exact path="/favorites">
        {" "}
        <FavoritesProducts favorites={favorites} />{" "}
      </Route>
    </BrowserRouter>
  );
}

export default App;
