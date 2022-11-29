import axios from "axios";
import {
  //Products
  URL_PRODUCTS,
  URL_PRODUCTS_QUERY,
  GET_PRODUCTS,
  GET_NAME_PRODUCTS,
  POST_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,

  //Filters & Sorts
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
  CLEAR_RESPONSE,

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
  PAYMENT_ORDER,
  ERROR_PAYMENT,

  //User actions
  CREATE_USER,
  GET_ALL_USERS,
  DELETE_USER,
  SET_TOKEN,

  //User profile actions
  GET_ALL_USER_PROFILES,
  GET_USER_PROFILE_BY_EMAIL,
  CREATE_USER_PROFILE,
  UPDATE_USER_PROFILE,
  DELETE_USER_PROFILE,

  //Favorites actions
  ADD_PRODUCT_TO_FAVORITES,
  GET_PRODUCT_FROM_FAVORITES,
  REMOVE_ONE_FROM_FAVORITES,
  REMOVE_ALL_FROM_FAVORITES,

  //Reviews actions
  ADD_REVIEW_TO_PRODUCT,
  GET_REVIEWS,
  EDIT_REVIEW,
  REMOVE_ONE_REVIEW,
} from "./Const";

// ----- PRODUCTS

export function getProducts() {
  return async function (dispatch) {
    try {
      let products = await axios.get("/products");
      return dispatch({
        type: GET_PRODUCTS,
        payload: products.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_PRODUCTS,
        payload: error.response.data,
      });
    }
  };
}

export function getProductDetail(detailId) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/products/${detailId}`);
      json.data.id = detailId;
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_DETAILS,
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
        type: GET_NAME_PRODUCTS,
        payload: error.response.data,
      });
    }
  };
}

export function postProduct(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_PRODUCTS, payload);
      return dispatch({
        type: POST_PRODUCT,
        payload: response.data,
      });
    } catch (error) {  
      return dispatch({
        type: POST_PRODUCT,
        payload: error.response.data
      })
    }
  };
}

export function editProduct(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.put(URL_PRODUCTS, payload)
      console.log(response)
      return dispatch({
        type: EDIT_PRODUCT,
        payload: response.data,
      });
    } catch (error) {  
      return dispatch({
        type: EDIT_PRODUCT,
        payload: error.response.data
      })
    }
  };
}

export function deleteProduct(id, payload) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/product/${id}`, payload);
      return dispatch({
        type: DELETE_PRODUCT,
        payload: response.data,
      });
    } catch (error) {  
      return dispatch({
        type: DELETE_PRODUCT,
        payload: error.response.data
      })
    }
  };
}

// export const updateProduct = (id, data)=>{
//   return async function(dispatch){
//     return axios.put(`http://localhost:8000/products/${id}`, data,{ headers: authHeader() })
//       .then(response =>{
//           dispatch({type: UPDATE_PRODUCT, payload: response.data})
//       }).catch(err=> console.log(err))
//   }
// }

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

export function addReviewToProduct(idProduct, idUser, input) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/reviews?idProduct=${idProduct}`, {
        ...input,
        idUser,
      });
      return dispatch({
        type: ADD_REVIEW_TO_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ADD_REVIEW_TO_PRODUCT,
        payload: error.response.data,
      });
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
      return dispatch({
        type: GET_REVIEWS,
        payload: error.response.data,
      });
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
      return dispatch({
        type: EDIT_REVIEW,
        payload: error.response.data,
      });
    }
  };
}

export function removeOneReview(idReview) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/reviews?idReview=${idReview}`);
      return dispatch({
        type: REMOVE_ONE_REVIEW,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: REMOVE_ONE_REVIEW,
        payload: error.response.data,
      });
    }
  };
}
//// Cleaning responses from back, ejecutarlos con los handleChange de los inputs
export const clearResponse = () => {
  return { type: CLEAR_RESPONSE };
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
      return dispatch({ type: ERROR_CART, payload: error.response.data });
    }
  };
};
export const getCartFromDB = (userId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/cart?userId=${userId}`);
      return dispatch({ type: GET_CART_DB, payload: response.data });
    } catch (error) {
      return dispatch({ type: ERROR_CART, payload: error.response.data });
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

export function paymentOrder(userEmail) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/payment/new?userEmail=${userEmail}`);
      return dispatch({ type: PAYMENT_ORDER, payload: response.data.url });
    } catch (error) {
      return dispatch({ type: ERROR_PAYMENT, payload: error.response.data });
    }
  };
}

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
        type: CREATE_USER,
        payload: error.response.data,
      });
    }
  };
};

export function getAllUsers() {
  return async function (dispatch) {
    try {
      let users = await axios.get("/user");
      return dispatch({
        type: GET_ALL_USERS,
        payload: users.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_ALL_USERS,
        payload: error.response.data,
      });
    }
  };
}

export function deleteUser(email) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/user/${email}`);
      return dispatch({
        type: DELETE_USER,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: DELETE_USER,
        payload: error.response.data,
      });
    }
  };
}

export const setTokenInStore = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

//User Profile Actions

export function getAllUserProfiles(email) {
  return async function (dispatch) {
    try {
      let userProfiles = await axios.get(`/userProfile?email=${email}`);
      return dispatch({
        type: GET_ALL_USER_PROFILES,
        payload: userProfiles.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_ALL_USER_PROFILES,
        payload: error.response.data,
      });
    }
  };
}

export function getUserProfileByEmail(email) {
  return async function (dispatch) {
    try {
      let userProfile = await axios(`/userProfile?email=${email}`);
      return dispatch({
        type: GET_USER_PROFILE_BY_EMAIL,
        payload: userProfile.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_USER_PROFILE_BY_EMAIL,
        payload: error.response.data,
      });
    }
  };
}

export const createUserProfile = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/userProfile", payload);
      return dispatch({
        type: CREATE_USER_PROFILE,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: CREATE_USER_PROFILE,
        payload: error.response.data,
      });
    }
  };
};

export const updateUserProfile = (email, payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/userProfile/${email}`, payload);
      return dispatch({
        type: UPDATE_USER_PROFILE,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: UPDATE_USER_PROFILE,
        payload: error.response.data,
      });
    }
  };
};

export function deleteUserProfile(email) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/userProfile?email=${email}`);
      return dispatch({
        type: DELETE_USER_PROFILE,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: DELETE_USER_PROFILE,
        payload: error.response.data,
      });
    }
  };
}

//Favorites actions
export function addProductToFavorites(idProduct, idUser) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/favorites?idProduct=${idProduct}`, {
        idUser,
      });
      return dispatch({
        type: ADD_PRODUCT_TO_FAVORITES,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ADD_PRODUCT_TO_FAVORITES,
        payload: error.response.data,
      });
    }
  };
}

export function getProductFromFavorites(userEmail) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/favorites?userEmail=${userEmail}`);
      return dispatch({
        type: GET_PRODUCT_FROM_FAVORITES,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_PRODUCT_FROM_FAVORITES,
        payload: error.response.data,
      });
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
      return dispatch({
        type: REMOVE_ONE_FROM_FAVORITES,
        payload: error.response.data,
      });
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
      return dispatch({
        type: REMOVE_ALL_FROM_FAVORITES,
        payload: error.response.data,
      });
    }
  };
}
