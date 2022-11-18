import axios from "axios";
import {
  URL_PRODUCTS,
  URL_PRODUCTS_QUERY,
  GET_PRODUCTS,
  GET_NAME_PRODUCTS,
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
  SET_CURRENT_PAGE_PRODUCTS,
  ERROR,
  SUCCESS,
  CLEAR_SUCCESS,
  CLEAR_ERROR,


  //Shopping Cart actions
  ADD_PRODUCT_TO_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  CLEAR_CART,
} from "./Const";

// ----- PRODUCTS

export function getProducts() {
  return async function (dispatch) {
    try {
      let products = await axios(URL_PRODUCTS);
      return dispatch({
        type: GET_PRODUCTS,
        payload: products.data,
      });
    } catch (error) {
      return {
        type: ERROR,
        payload: error.response.data,
      };
    }
  };
}

export function getProductDetail(detailId) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/products/${detailId}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      return {
        type: ERROR,
        payload: error.response.data,
      };
    }
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
      return {
        type: ERROR,
        payload: error.response.data,
      };
    }
  };
}

// --- FILTERS

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

export function filterByCategory(payload) {
  return {
    type: FILTER_CATEGORIES,
    payload,
  };
}

export function filterByPrice(payload) {
  return {
    type: FILTER_PRICES,
    payload,
  };
}

export function filterByBrand(payload) {
  return {
    type: FILTER_BRAND,
    payload,
  };
}

// ----- ORDER

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

// --- PAGINATION
// this action creator works for paging:
export const setProductsPerPage = (currentPage) => {
  return async (dispatch) => {
    if (currentPage) {
      const data = { type: SET_CURRENT_PAGE_PRODUCTS, payload: currentPage };
      await dispatch(data);
    }
  };
};

// --- REVIEWS

export function postProduct(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_PRODUCTS, payload);
      return dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      return {
        type: ERROR,
        payload: error.response.data,
      };
    }
  };
}
//// Cleaning responses from back, ejecutarlos con los handleChange de los inputs
export const clearError = () => {
  return { type: CLEAR_ERROR };
};

export const clearSuccess = () => {
  return { type: CLEAR_SUCCESS };
};

// Shopping cart actions
export const addToCart = (id) => {
  return { type: ADD_PRODUCT_TO_CART, payload: id };
};
export const deleteFromCart = (id, all = false) => {
  if (all) {
    return { type: REMOVE_ALL_FROM_CART, payload: id };
  } else {
    return { type: REMOVE_ONE_FROM_CART, payload: id };
  }
};

export const clearCart = () => {
  return { type: CLEAR_CART };
};

export function clearDetails(){
  return {type: CLEAR_DETAILS}
}