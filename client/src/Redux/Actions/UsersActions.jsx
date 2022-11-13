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
  SET_CURRENT_PAGE_PRODUCTS,
  ERROR,
  SUCCESS,
  CLEAR_SUCCESS,
  CLEAR_ERROR,
  SET_CURRENT_PAGE_PRODUCTS,
  FILTER_UNIQUECATEGORIES,
  FILTER_UNIQUEGENDER,
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
      return dispatch({
        type: ERROR,
        payload: error.response.data,
      });
    }
  };
}

export function getProductDetail(detailId) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/products/${detailId}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.response.data,
      });
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
      return dispatch({
        type: ERROR,
        payload: error.response.data,
      });
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

export function filterUniqueCategories() {
  return async function (dispatch) {
    try {
      let products = await axios(URL_PRODUCTS);
      return dispatch({
        type: FILTER_UNIQUECATEGORIES,
        payload: products.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.response.data,
      });
    }
  };
}

export function filterUniqueBrand() {
  return async function (dispatch) {
    try {
      let products = await axios(URL_PRODUCTS);
      return dispatch({
        type: GET_BRAND,
        payload: products.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.response.data,
      });
    }
  };
}

export function filterUniqueGender() {
  return async function (dispatch) {
    try {
      let products = await axios(URL_PRODUCTS);
      return dispatch({
        type: FILTER_UNIQUEGENDER,
        payload: products.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.response.data,
      });
    }
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

export function postReview(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_PRODUCTS, payload);
      return dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.response.data,
      });
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
