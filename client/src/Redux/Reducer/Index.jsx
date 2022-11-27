import {
  getStorage,
  saveStorage,
  deleteStorage,
} from "../../localStorage/localStorageFunctions";

import {
  FILTER_PRICES,
  FILTER_CATEGORIES,
  FILTER_GENDER,
  FILTER_BRAND,
  FILTER_SIZE,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  GET_DETAILS,
  CLEAR_DETAILS,
  SUCCESS,
  ERROR,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  SET_CURRENT_PAGE_PRODUCTS,

  //Favorites
  ADD_PRODUCT_TO_FAVORITES,
  GET_PRODUCT_FROM_FAVORITES,
  REMOVE_ALL_FROM_FAVORITES,
  REMOVE_ONE_FROM_FAVORITES,

  //Products
  GET_PRODUCTS,
  GET_NAME_PRODUCTS,

  //Shopping cart actions
  ADD_PRODUCT_TO_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  CLEAR_CART,
  POST_TO_CART_DB,
  GET_CART_DB,
  DELETE_CART,
  DELETE_PRODUCT_CART,
  ERROR_CART,
  PAYMENT_ORDER,

  //Review
  ADD_REVIEW_TO_PRODUCT,
  GET_REVIEWS,
  EDIT_REVIEW,
  REMOVE_ONE_REVIEW,

  //User
  CREATE_USER,
  GET_ALL_USERS,
  DELETE_USER,
  SET_TOKEN,

  //UserProfile
  GET_ALL_USER_PROFILES,
  GET_USER_PROFILE_BY_EMAIL,
  CREATE_USER_PROFILE,
  UPDATE_USER_PROFILE,
  DELETE_USER_PROFILE,
} from "../Actions/Const";

const dataStorage = getStorage("shoppCart");

const initialState = {
  error: "",
  success: "",
  //cart:
  cartDB: [],
  cartDbResponse: "",
  shoppingCart: dataStorage !== null ? Object.values(dataStorage) : [],
  paymentLink: "",
  //pagination:
  currentProducts: [],
  currentPage: 1,
  productsPerPage: 9,
  indexLastProduct: 9,
  indexFirsProduct: 0,
  //product:
  products: [],
  allProducts: [],
  allBrands: [],
  details: [],
  //user:
  userStore: [],
  usersStore: [],
  token: "",
  userProfiles: [],
  userProfile: [],
  usuarios: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        currentProducts: [...action.payload].slice(
          state.indexFirsProduct,
          state.indexLastProduct
        ),
      };
    case GET_NAME_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...action.payload].slice(0, 6),
      };
    case SET_CURRENT_PAGE_PRODUCTS:
      state.currentPage = action.payload;
      state.indexLastProduct = state.currentPage * state.productsPerPage;
      state.indexFirsProduct = state.indexLastProduct - state.productsPerPage;
      return {
        ...state,
        currentProducts: state.products.slice(
          state.indexFirsProduct,
          state.indexLastProduct
        ),
      };

    case FILTER_PRICES:
      const priceFiltered = state.allProducts;
      let priceFilter;
      if (action.payload === "all") {
        priceFilter = priceFiltered;
      } else if (action.payload === "<50") {
        priceFilter = priceFiltered.filter((p) => parseInt(p.price) < 50);
      } else if (action.payload === "50 - 100") {
        priceFilter = priceFiltered.filter(
          (p) => parseInt(p.price) > 50 && parseInt(p.price) < 100
        );
      } else if (action.payload === ">100") {
        priceFilter = priceFiltered.filter((p) => parseInt(p.price) > 100);
      }
      return {
        ...state,
        products: priceFilter,
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...priceFilter].slice(0, 6),
      };
    case ORDER_BY_NAME:
      const sortedArr =
        action.payload === "asc"
          ? state.allProducts.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              } else if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.allProducts.sort(function (a, b) {
              if (a.name < b.name) {
                return 1;
              } else if (a.name > b.name) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        products: sortedArr,
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...sortedArr].slice(0, 6),
      };
    case ORDER_BY_PRICE:
      const priceOrder =
        action.payload === "asc"
          ? state.allProducts.sort(function (a, b) {
              if (parseInt(a.price) > parseInt(b.price)) {
                return 1;
              } else if (parseInt(a.price) < parseInt(b.price)) {
                return -1;
              }
              return 0;
            })
          : state.allProducts.sort(function (a, b) {
              if (parseInt(a.price) < parseInt(b.price)) {
                return 1;
              } else if (parseInt(a.price) > parseInt(b.price)) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        products: priceOrder,
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...priceOrder].slice(0, 6),
      };
    case FILTER_GENDER:
      const genderFiltered =
        action.payload === "all"
          ? state.allProducts
          : state.allProducts?.filter(
              (e) => e.gender.toLowerCase() === action.payload.toLowerCase()
            );
      return {
        ...state,
        products: genderFiltered,
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...genderFiltered].slice(0, 6),
      };
    case FILTER_SIZE:
      const sizeFiltered =
        action.payload === "all"
          ? state.allProducts
          : state.allProducts.filter((p) => p.size.includes(action.payload));
      return {
        ...state,
        products: sizeFiltered,
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...sizeFiltered].slice(0, 6),
      };
    case FILTER_BRAND:
      const brandFiltered =
        action.payload === "all"
          ? state.allProducts
          : state.allProducts.filter(
              (b) => b.brand.name.toLowerCase() === action.payload.toLowerCase()
            );
      return {
        ...state,
        products: brandFiltered,
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...brandFiltered].slice(0, 6),
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case FILTER_CATEGORIES:
      const categoryFiltered =
        action.payload === "all"
          ? state.allProducts
          : state.allProducts.filter(
              (b) =>
                b.category.name.toLowerCase() === action.payload.toLowerCase()
            );
      return {
        ...state,
        products: categoryFiltered,
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...categoryFiltered].slice(0, 6),
      };

    /////// Managing responses from back
    case SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: "",
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };

    // Shopping cart reducer functions
    case ADD_PRODUCT_TO_CART:
      let newItem = state.allProducts.find(
        (item) => item.id === action.payload.id
      );
      let itemInCart = state.shoppingCart.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      let productToAdd = {
        id: newItem.id,
        name: newItem.name,
        type: newItem.type,
        color: action.payload.color,
        gender: newItem.gender,
        size: action.payload.size,
        rating: newItem.rating,
        price: newItem.price,
        description: newItem.description,
        image: newItem.image,
        brandName: newItem.brandName,
        categoryName: newItem.categoryName,
      };

      let conditionalAddState =
        itemInCart && itemInCart.amount
          ? {
              ...state,
              shoppingCart: state.shoppingCart.map((item) =>
                item === itemInCart
                  ? { ...item, amount: item.amount + 1 }
                  : item
              ),
            }
          : {
              ...state,
              shoppingCart: [
                ...state.shoppingCart,
                { ...productToAdd, amount: action.payload.amount },
              ],
            };
      saveStorage("shoppCart", {
        ...conditionalAddState.shoppingCart,
      });
      return conditionalAddState;
    case REMOVE_ALL_FROM_CART:
      let itemToRemove = state.shoppingCart.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      let remainedProducts = state.shoppingCart.filter(
        (item) => item !== itemToRemove
      );

      if (remainedProducts.length === 0) {
        deleteStorage("shoppCart");
      }

      saveStorage("shoppCart", {
        ...remainedProducts,
      });

      return {
        ...state,
        shoppingCart: remainedProducts,
      };
    case REMOVE_ONE_FROM_CART:
      let itemToDelete = state.shoppingCart.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      let conditionalRemoveState =
        itemToDelete?.amount > 1
          ? {
              ...state,
              shoppingCart: state.shoppingCart.map((item) =>
                item === itemToDelete
                  ? { ...item, amount: item.amount - 1 }
                  : item
              ),
            }
          : {
              ...state,
              shoppingCart: state.shoppingCart.filter(
                (item) => item !== itemToDelete
              ),
            };

      saveStorage("shoppCart", {
        ...conditionalRemoveState.shoppingCart,
      });

      return conditionalRemoveState;

    //Cart from DB manage
    case POST_TO_CART_DB:
      return { ...state, cartDbResponse: action.payload };
    case GET_CART_DB:
      return {
        ...state,
        cartDB: action.payload,
      };

    case DELETE_CART:
      return { ...state, cartDB: [], cartDbResponse: action.payload };

    case DELETE_PRODUCT_CART:
      return { ...state, cartDbResponse: action.payload };

    case CLEAR_CART:
      return { ...state, shoppingCart: [], cartDbResponse: "" };

    case ERROR_CART:
      return { ...state, errorCart: action.payload };

    case CLEAR_DETAILS:
      return {
        ...state,
        details: [],
      };

    case PAYMENT_ORDER:
      return {
        ...state,
        paymentLink: action.payload,
      };
    //Users
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        userStore: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        usersStore: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        usersStore: state.usersStore.filter((u) => u !== action.payload),
      };
    //User Profile
    case GET_ALL_USER_PROFILES:
      return {
        ...state,
        userProfiles: action.payload,
      };
    case GET_USER_PROFILE_BY_EMAIL:
      return {
        ...state,
        userProfile: action.payload,
      };
    case CREATE_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case DELETE_USER_PROFILE:
      return {
        ...state,
        userProfiles: state.userProfiles.filter((u) => u !== action.payload),
      };

    // Favorites Products reducer functions
    case ADD_PRODUCT_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case GET_PRODUCT_FROM_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };

    case REMOVE_ALL_FROM_FAVORITES:
      return {
        ...state,
        favorites: initialState.favorites,
      };

    case REMOVE_ONE_FROM_FAVORITES:
      const removeOneProduct = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        favorites: removeOneProduct,
      };

    // Reviews Products reducer functions
    case ADD_REVIEW_TO_PRODUCT:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case EDIT_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };

    case REMOVE_ONE_REVIEW:
      const removeOneReview = state.reviews.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        reviews: removeOneReview,
      };

    default:
      return state;
  }
}

export default rootReducer;
