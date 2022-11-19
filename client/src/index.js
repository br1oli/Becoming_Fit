import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/Index.js";
import { BrowserRouter } from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import dotenv from 'dotenv';
import Auth0ProviderWithHistory from "./Components/Auth/auth0-provider-with-history";

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "https://becomingfit-production.up.railway.app";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <Auth0ProviderWithHistory>
    <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </Auth0ProviderWithHistory>,
  
  document.getElementById("root")

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
