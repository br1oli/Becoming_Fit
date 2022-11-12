import axios from "axios";
import {
  URL_PRODUCTS,
  URL_PRODUCTS_QUERY,
  GET_PRODUCTS,
  GET_NAME_PRODUCTS,
  GET_BRAND,
  FILTER_PRICES,
  FILTER_CATEGORIES,
  FILTER_GENDER,
  FILTER_BRAND,
  FILTER_SIZE,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  GET_DETAILS,
  CLEAR_DETAILS,
  DELETE_OWN_REVIEW,
  EDIT_OWN_REVIEW,
} from "./Const";

export function getProducts() {
  return async function (dispatch) {
    try {
      let products = await axios(URL_PRODUCTS);
      console.log(products);
      return dispatch({
        type: GET_PRODUCTS,
        payload: products.data,
      });
    } catch (error) {
      return error;
    }
  };
}

/* export function filterByPrice(payload) {
  return {
    type: FILTER_PRICES,
    payload,
  };
} */

export function filterBySize(payload) {
  return {
    type: FILTER_SIZE,
    payload,
  };
}

export function filterByGender(payload) {
  return {
    type: FILTER_GENDER,
    payload,
  };
}

export function filterByBrand(payload) {
  return {
    type: FILTER_BRAND,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByPrice(payload) {
  return {
    type: ORDER_BY_PRICE,
    payload,
  };
}

export function getNameProducts(name) {
  return async function (dispatch) {
    try {
      const products = await axios.get(URL_PRODUCTS_QUERY + name);
      return dispatch({
        type: GET_NAME_PRODUCTS,
        payload: products.data,
      });
    } catch (error) {
      alert("Product doesnt exist");
    }
  };
}

export function postReview(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_PRODUCTS, payload);
      return {
        response,
      };
    } catch (error) {
      return error;
    }
  };
}

export  function getProductDetail(detailId){
  return async function(dispatch){
      try{
          var json = await axios.get(`http://localhost:3001/products/${detailId}`);
          return dispatch({
              type: 'GET_DETAILS',
              payload: json.data
          })
      }catch(error){
          return dispatch({
              type: "ERROR",
              payload: error
          })
      }
  }
}

// export  function getAllProducts(payload){
//     return async function(dispath){
//         try{
//             var json = await axios.get(`http://localhost:3001/products`);
//             return dispath({
//                 type: "GET_PRODUCTS",
//                 payload: json.data
//             })
//         }catch(error){
//             console.log(error, "error al traer los productos")
//             return dispath({
//                 type: "ERROR",
//                 payload: error
//             })
//         }
//     }
// }
