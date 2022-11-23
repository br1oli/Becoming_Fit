import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import ProductDetail from "./Components/ProductComponents/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductFromFavorites} from "./Redux/Actions/UsersActions";

import ProductForm from "./Components/ProductComponents/ProductForm";
import About from "./Components/About/About.jsx";
import FAQs from './Components/FAQs/FAQs'
import TermsConditions from './Components/Terms&Conditions/TermsConditions'
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy'
//AUTH0
import Profile from "./Components/Auth/user-info";

import FavoritesProducts from "./Components/Favorites/FavoritesProducts";

function App() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const { isAuthenticated } = useAuth0();
  //AUTH0
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState([]);

  useEffect(() => {
    const generarToken = async () => {
      try {
        const tokenApi = await getAccessTokenSilently();
        setToken(tokenApi);
        sessionStorage.setItem("userToken", JSON.stringify(tokenApi));
      } catch (error) {
        console.log(error);
      }
    };
    generarToken();
  }, []);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getProductFromFavorites())
  },[])

  return (
    <BrowserRouter>
     <Route exact path="/termns&conditions" component={TermsConditions} />
      <Route exact path="/FAQs" component={FAQs} />
      <Route exact path="/privacypolicy" component={PrivacyPolicy} />

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
