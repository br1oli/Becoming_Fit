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
  POST_TO_CART_DB,
  DELETE_CART,
  GET_CART_DB,
  DELETE_PRODUCT_CART,
  ERROR_CART,

  //User actions
  CREATE_USER,
  SET_TOKEN,
  ADD_PRODUCT_TO_FAVORITES,
  GET_PRODUCT_FROM_FAVORITES,
  REMOVE_ONE_FROM_FAVORITES,
  REMOVE_ALL_FROM_FAVORITES,
  ADD_REVIEW_TO_PRODUCT,
  GET_REVIEWS,
  EDIT_REVIEW,
  REMOVE_ONE_REVIEW,
  UPDATE_USER,
  UPDATE_USER_INFO,
  GET_USER_ACT,
  URL_USER_ACT,
} from "./Const";

// ----- PRODUCTS

export function getProducts() {
  return async function (dispatch) {
    try {
      let products = await axios("/products");
      return dispatch({
        type: GET_PRODUCTS,
        payload: products.data,
      });
    } catch (error) {
      return {
        type: ERROR,
        payload: error.data,
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
export const addToCart = (values) => {
  return { type: ADD_PRODUCT_TO_CART, payload: values };
};
export const deleteFromCart = (values, all = false) => {
  if (all) {
    return { type: REMOVE_ALL_FROM_CART, payload: values };
  } else {
    return { type: REMOVE_ONE_FROM_CART, payload: values };
  }
};

export const clearCart = () => {
  return { type: CLEAR_CART };
};
export const postCartToDB = (values) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/cart", values);
      return dispatch({ type: POST_TO_CART_DB, payload: response.data });
    } catch (error) {
      return dispatch({ type: ERROR, payload: error.response.data });
    }
  };
};
export const getCartFromDB = (userId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/cart?userId=${userId}`);
      return dispatch({ type: GET_CART_DB, payload: response.data });
    } catch (error) {
      return dispatch({ type: ERROR_CART, payload: error.response?.data });
    }
  };
};
export const clearCartInDb = (cartId) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/cart?cartId=${cartId}`);
      return dispatch({ type: DELETE_CART, payload: response.data });
    } catch (error) {
      return dispatch({ type: ERROR_CART, payload: error.response.data });
    }
  };
};
export const deleteProductCartInDb = (values) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        `/cartProduct?productId=${values.productId}&color=${values.color}&size=${values.size}`
      );
      return dispatch({ type: DELETE_PRODUCT_CART, payload: response.data });
    } catch (error) {
      return dispatch({ type: ERROR_CART, payload: error.response.data });
    }
  };
};

export function clearDetails() {
  return { type: CLEAR_DETAILS };
}

// User actions

// User actions

export const createUser = (email) => {
  return async function (dispatch) {
    try {
      let user = await axios.post(`/user?email=${email}`);
      return dispatch({
        type: CREATE_USER,
        payload: user.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.response.data,
      });
    }
  };
};

export const setTokenInStore = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

//Favorites actions
export function addProductToFavorites(idProduct) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/favorites?idProduct=${idProduct}`);
      return dispatch({
        type: ADD_PRODUCT_TO_FAVORITES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      // return {
      //   type: ERROR,
      //   payload: error.response.data,
      // };
    }
  };
}

export function getProductFromFavorites() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/favorites`);
      return dispatch({
        type: GET_PRODUCT_FROM_FAVORITES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      // return {
      //   type: ERROR,
      //   payload: error.response.data,
      // };
    }
  };
}

export function removeOneProductFromFavorites(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/favorites?id=${id}`);
      return dispatch({
        type: REMOVE_ONE_FROM_FAVORITES,
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

export function removeAllProductsFromFavorites() {
  return async (dispatch) => {
    try {
      const response = await axios.delete("/favoritesAll");
      return dispatch({
        type: REMOVE_ALL_FROM_FAVORITES,
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

// Reviews Products Actions
export function addReviewToProduct(idProduct, input) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/reviews?idProduct=${idProduct}`,
        input
      );
      return dispatch({
        type: ADD_REVIEW_TO_PRODUCT,
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

export function getReviews() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/reviews`);
      return dispatch({
        type: GET_REVIEWS,
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

export function editReviews() {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/reviews`);
      return dispatch({
        type: EDIT_REVIEW,
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

export function removeReviews() {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/reviews`);
      return dispatch({
        type: REMOVE_ONE_REVIEW,
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

export const actUser = (payload) => {
	return async function (dispatch) {
    try {
      const response = await axios.post(
        "/usuarios", payload);
        return dispatch({
          type: UPDATE_USER,
          payload: response.data
        })
    } catch (error) {
      return {
        type: ERROR,
        payload: error.data,
      };
    }
	}
}


export const changeUserInfo = (email, payload) => {
	return async function (dispatch) {
    try {
      const response = await axios.put(
        `/usuarios?email=${email}`, payload);
        return dispatch({
          type: UPDATE_USER_INFO,
          payload: response.data
        })
    } catch (error) {
      return {
        type: ERROR,
        payload: error.data,
      };
    }
	}
}

// export const updateProduct = (id, data)=>{
//   return async function(dispatch){
//     return axios.put(`http://localhost:8000/products/${id}`, data,{ headers: authHeader() })
//       .then(response =>{
//           dispatch({type: UPDATE_PRODUCT, payload: response.data})
//       }).catch(err=> console.log(err))
//   }
// }

export function getUserAct(email) {
  return async function (dispatch) {
    try {
      console.log("entra a la accion del get", email)
      let userProfile = await axios(`${URL_USER_ACT}?email=${email}`);
      return dispatch({
        type: GET_USER_ACT,
        payload: userProfile.data,
      });
    } catch (error) {
      return {
        type: ERROR,
        payload: error.response.data,
      };
    }
  };
}
