import {
  getStorage,
  saveStorage,
  deleteStorage,
} from "../../localStorage/localStorageFunctions";

import {
  CLEAR_RESPONSE,
  FILTER_PRICES,
  FILTER_CATEGORIES,
  FILTER_GENDER,
  FILTER_BRAND,
  FILTER_SIZE,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  SET_CURRENT_PAGE_PRODUCTS,

  //Favorites
  ADD_PRODUCT_TO_FAVORITES,
  GET_PRODUCT_FROM_FAVORITES,
  REMOVE_ALL_FROM_FAVORITES,
  REMOVE_ONE_FROM_FAVORITES,

  //Products
  GET_PRODUCTS,
  GET_NAME_PRODUCTS,
  GET_NAME_PRODUCTS_ERROR,
  POST_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  CHANGE_PRODUCT_STOCK,
  GET_DETAILS,
  CLEAR_DETAILS,

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
  UPDATE_USER,
  CREATE_USER_ORDER,
  GET_USER_ORDER,
  GET_ALL_ORDERS_ADMIN,

  //Mailing
  POST_MAIL,
  POST_MAIL_DELIVER,

  //New types products
  POST_NEW_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORIES,
  DELETE_PRODUCT_CATEGORY,
} from "../Actions/Const";

const dataStorage = getStorage("shoppCart");

const initialState = {
  backResponse: "",
  //cart:
  cartDB: [],
  cartDbResponse: "",
  shoppingCart: dataStorage !== null ? Object.values(dataStorage) : [],
  paymentLink: "",
  userOrders: [],
  adminOrders: [],
  //pagination:
  currentProducts: [],
  currentPage: 1,
  productsPerPage: 9,
  indexLastProduct: 9,
  indexFirsProduct: 0,
  //product:
  products: [],
  allProducts: [],
  allProductsForAdmin: [],
  currentProductsForAdmin: [],
  allBrands: [],
  details: [],
  //user:
  userStore: [], //usuario específico
  usersStore: [], //todos los usuarios
  token: "",
  userProfiles: [], //el perfil de un usuario específico
  userProfile: [], //todos los usuarios

  //type products
  categories: [],
  favorites: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_RESPONSE:
      return {
        ...state,
        backResponse: "",
      };
    case GET_PRODUCTS:
      const filteredByDeleted = action.payload.filter(
        (p) => p.isDeleted !== true
      );
      return {
        ...state,
        products: filteredByDeleted,
        allProducts: filteredByDeleted,
        allProductsForAdmin: action.payload,
        currentProducts: [...filteredByDeleted].slice(
          state.indexFirsProduct,
          state.indexLastProduct
        ),
        currentProductsForAdmin: [...action.payload].slice(
          state.indexFirsProduct,
          state.indexLastProduct
        ),
      };
    case GET_NAME_PRODUCTS:
      const filteredByDeletedInNameCase = action.payload.filter(
        (p) => p.isDeleted !== true
      );
      return {
        ...state,
        products: filteredByDeletedInNameCase,
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...filteredByDeletedInNameCase].slice(0, 6),
      };
    case GET_NAME_PRODUCTS_ERROR:
      return {
        ...state,
        products: state.allProducts,
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...state.allProducts].slice(0, 6),
      };
    case POST_PRODUCT:
      return {
        ...state,
        backResponse: action.payload,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        backResponse: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        backResponse: action.payload,
      };
    case CHANGE_PRODUCT_STOCK:
      return {
        ...state,
        backResponse: action.payload,
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
                  ? { ...item, amount: item.amount + action.payload.amount }
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
      if (action.payload.id) {
        saveStorage("cartId", action.payload.id);
      }
      let conditionalCartDBState =
        action.payload === "No products found in cart"
          ? {
              ...state,
              backResponse: action.payload,
            }
          : {
              ...state,
              cartDB: action.payload,
            };
      return conditionalCartDBState;

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
      saveStorage("userOrder", action.payload.data);
      return {
        ...state,
        paymentLink: action.payload.url,
      };

    case CREATE_USER_ORDER:
      return { ...state, backResponse: action.payload };
    case GET_USER_ORDER:
      let conditionalOrderState =
        action.payload === "No orders yet..."
          ? {
              ...state,
              backResponse: action.payload,
            }
          : {
              ...state,
              userOrders: action.payload,
            };
      return conditionalOrderState;

    case GET_ALL_ORDERS_ADMIN:
      let conditionalAllOrdersState = action.payload === "No orders yet..." ? {
        ...state, 
        backResponse: action.payload
      } : {
        ...state, adminOrders: action.payload
      }
      return conditionalAllOrdersState

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
    case UPDATE_USER:
      return {
        ...state,
        usersStore: action.payload,
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
        userProfiles: [...state.userProfiles, action.payload],
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
      let conditionalFavoriteState = action.payload === "No products added yet" ? {
        ...state, 
        backResponse: action.payload
      } : {
        ...state, favorites: action.payload
      }
      return conditionalFavoriteState

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

    //Mailing functions
    case POST_MAIL:
      return {
        ...state,
      };

    case POST_MAIL_DELIVER:
      return {
        ...state,
      };
    //Product types functions
    case POST_NEW_PRODUCT_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case GET_PRODUCT_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case DELETE_PRODUCT_CATEGORY:
      const deleteProductCategory = state.categories.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        categories: deleteProductCategory,
      };

    default:
      return state;
  }
}

export default rootReducer;
