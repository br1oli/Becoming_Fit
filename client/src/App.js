import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import ProductDetail from "./Components/ProductComponents/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./Components/ProductComponents/ProductForm";
import About from "./Components/About/About.jsx";
import PaymentSuccess from "./Components/Payments/Succes/PaymentSuccess.jsx";
import PaymentFailure from "./Components/Payments/Failure/PaymentFailure.jsx";

import AdminDashboardUI from "./Components/Admin/AminUI/AdminDashboardUI";
//AUTH0
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Components/Auth/user-info";
import FavoritesProducts from "./Components/Favorites/FavoritesProducts";
import {
  getProducts,
  createUser,
  setTokenInStore,
} from "./Redux/Actions/UsersActions";
import FormComplete from "./Components/Form/Form";

function App() {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user } = useAuth0();
  const favorites = useSelector((state) => state.favorites);
  //AUTH0
  const [token, setToken] = useState([]);

  useEffect(() => {
    const generarToken = async () => {
      try {
        const tokenApi = await getAccessTokenSilently();
        setToken(tokenApi);
      } catch (error) {
        console.log(error);
      }
    };
    generarToken();
  }, []);

  useEffect(() => {
    dispatch(getProducts());
    if (token.length && user !== undefined) {
      dispatch(setTokenInStore(token));
      dispatch(createUser(user.email));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Route exact path="/admin" component={AdminDashboardUI} />
      {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
      <Route exact path="/complete" component={FormComplete} />
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
      <Route exact path="/paymentsuccess" component={PaymentSuccess} />
      <Route exact path="/paymentfailure" component={PaymentFailure} />
      <Route exact path="/favorites">
        {" "}
        <FavoritesProducts favorites={favorites} />{" "}
      </Route>
    </BrowserRouter>
  );
}

export default App;
