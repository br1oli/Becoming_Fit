import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import ProductDetail from "./Components/ProductComponents/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, createUser } from "./Redux/Actions/UsersActions";
import ProductForm from "./Components/ProductComponents/ProductForm";
import About from "./Components/About/About.jsx";
//AUTH0
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Components/Auth/user-info";
import FormComplete from "./Components/Form/Form";

function App() {
  const dispatch = useDispatch();
  const {user, isLoading, isAuthenticated } = useAuth0();
  const allProducts = useSelector((state) => state.allProducts);
  //AUTH0
  const { getAccessTokenSilently } = useAuth0();
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
  }, []);

  useEffect(async () => {
    if (isAuthenticated === true && user !== undefined) {
      await dispatch(createUser(user.email));
    }
  }, [dispatch, isAuthenticated, user]);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
