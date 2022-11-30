import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetail from "./Components/ProductComponents/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./Components/ProductComponents/ProductForm";
import About from "./Components/About/About.jsx";
import PaymentSuccess from "./Components/Payments/Succes/PaymentSuccess.jsx";
import PaymentFailure from "./Components/Payments/Failure/PaymentFailure.jsx";

//infotmation
import FAQs from './Components/FAQs/FAQs'
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy'
import Terms from './Components/Terms&Conditions/TermsConditions'

import AdminDashboardUI from "./Components/Admin/AminUI/AdminDashboardUI";
import ProductsList from "./Components/Admin/ProductsDashboard/ProductsList";
import EditProductForm from "./Components/Admin/ProductsDashboard/EditProductForm";
//AUTH0
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Components/Auth/user-info";
import FavoritesProducts from "./Components/Favorites/FavoritesProducts";
import {
  getProducts,
  createUser,
  setTokenInStore,
} from "./Redux/Actions/UsersActions";
import FormPayment from "./Components/Form/FormPayment";
import FormComplete from "./Components/Form/Form";
import Mailing from "./Components/Mailing/ConfirmationMail";
import MyOrders from "./Components/MyOrders/MyOrders";
import Error from "./Components/Error/Error";

function App() {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user } = useAuth0();
  const favorites = useSelector((state) => state.favorites);
  //AUTH0
  const [token, setToken] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [])

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
    if (token.length && user !== undefined) {
      dispatch(setTokenInStore(token));
      dispatch(createUser(user.email));
    }
  }, [token]);  

  return (
    <BrowserRouter>
    
      <Route exact path="/admin" component={AdminDashboardUI} />
      <Route exact path="/admin/products/list" component={ProductsList} />
      <Route exact path="/admin/products/create" component={ProductForm} />
      <Route exact path="/admin/products/edit" component={EditProductForm} />
      {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
      <Route exact path="/formpayment" component={FormPayment}/>
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
      <Route exact path="/aboutUs" component={About} />
      <Route exact path="/paymentsuccess" component={PaymentSuccess} />
      <Route exact path="/paymentfailure" component={PaymentFailure} />

      {/* INFORMATION */}
      <Route exact path="/FAQs" component={FAQs} />
      <Route exact path="/termns&conditions" component={Terms} />
      <Route exact path="/Privacypolicy" component={PrivacyPolicy} />


      <Route exact path="/favorites">
        {" "}
        <FavoritesProducts favorites={favorites} />{" "}
      </Route>
      <Route exact path="/myOrders" component={MyOrders} />
      <Route exact path="/emailUs" component={Mailing} />

      {/* <Route component={Error} /> */}
  
    </BrowserRouter>
  );
}

export default App;
