import {
  getStorage,
  saveStorage,
  deleteStorage,
} from "../../localStorage/localStorageFunctions";
import {
  GET_PRODUCTS,
  FILTER_PRICES,
  FILTER_CATEGORIES,
  FILTER_GENDER,
  FILTER_BRAND,
  FILTER_SIZE,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  GET_DETAILS,
  CLEAR_DETAILS,
  GET_NAME_PRODUCTS,
  SUCCESS,
  ERROR,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  SET_CURRENT_PAGE_PRODUCTS,

  //Shopping cart actions
  ADD_PRODUCT_TO_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  CLEAR_CART,
  POST_TO_CART_DB,
  GET_CART_DB,
  DELETE_CART,
  DELETE_PRODUCT_CART,

  //User
  CREATE_USER,

  //Favorites Products actions
  ADD_PRODUCT_TO_FAVORITES,
  GET_PRODUCT_FROM_FAVORITES,
  REMOVE_ONE_FROM_FAVORITES,
  REMOVE_ALL_FROM_FAVORITES,
} from "../Actions/Const";

const dataStorage = getStorage("shoppCart");
const tokenStorage = JSON.parse(sessionStorage.getItem("userToken"));

const initialState = {
  products: [],
  allProducts: [],
  allBrands: [],
  details: [],
  error: "",
  success: "",
  //pagination:
  currentProducts: [],
  currentPage: 1,
  productsPerPage: 6,
  indexLastProduct: 6,
  indexFirsProduct: 0,
  //
  shoppingCart: dataStorage !== null ? Object.values(dataStorage) : [],
  userStore: [],
  cartDB: [],
  cartDbResponse: "",
  token: tokenStorage !== null ? tokenStorage : "",
  favorites: [],
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
        (item) => item.id === action.payload
      );

      let itemInCart = state.shoppingCart.find(
        (item) => item.id === newItem.id
      );

      let conditionalAddState = itemInCart
        ? {
            ...state,
            shoppingCart: state.shoppingCart.map((item) =>
              item.id === newItem.id
                ? { ...item, amount: item.amount + 1 }
                : item
            ),
          }
        : {
            ...state,
            shoppingCart: [...state.shoppingCart, { ...newItem, amount: 1 }],
          };
      saveStorage("shoppCart", {
        ...conditionalAddState.shoppingCart,
      });
      return conditionalAddState;
    case REMOVE_ALL_FROM_CART:
      let remainedProducts = state.shoppingCart.filter(
        (item) => item.id !== action.payload
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
        (item) => item.id === action.payload
      );

      let conditionalRemoveState =
        itemToDelete?.amount > 1
          ? {
              ...state,
              shoppingCart: state.shoppingCart.map((item) =>
                item.id === action.payload
                  ? { ...item, amount: item.amount - 1 }
                  : item
              ),
            }
          : {
              ...state,
              shoppingCart: state.shoppingCart.filter(
                (item) => item.id !== action.payload
              ),
            };

      saveStorage("shoppCart", {
        ...conditionalRemoveState.shoppingCart,
      });

      return conditionalRemoveState;
    case POST_TO_CART_DB:
      return { ...state, cartDbResponse: action.payload };
    case GET_CART_DB:
      saveStorage("dbProducts", JSON.stringify(action.payload.cartProducts));
      return {
        ...state,
        cartDB: action.payload,
      };
    case DELETE_CART:
      deleteStorage("dbProducts");
      return { ...state, cartDB: [], cartDbResponse: action.payload };
    case DELETE_PRODUCT_CART:
      return { ...state, cartDbResponse: action.payload };

    case CLEAR_CART:
      return { ...state, shoppingCart: [], cartDbResponse: "" };

    case CLEAR_DETAILS:
      return {
        ...state,
        details: [],
      };
    case CREATE_USER:
      sessionStorage.setItem("userId", JSON.stringify(action.payload.id));
      return {
        ...state,
        userStore: action.payload,
      };

      // Favorites Products reducer functions 
    case ADD_PRODUCT_TO_FAVORITES:

      return {
        ...state,
        favorites:  [...state.favorites, action.payload]
      }
    
      case GET_PRODUCT_FROM_FAVORITES:
        return{
          ...state,
          favorites: action.payload
        };

      case REMOVE_ALL_FROM_FAVORITES:
        
        return{
          ...state,
          favorites: initialState.favorites,
        };

      case REMOVE_ONE_FROM_FAVORITES:
      const removeOneProduct = state.favorites.filter((item) => item.id !== action.payload.id); 
        return{
          ...state,
          favorites: removeOneProduct
        }

    default:
      return state;
  }
}

export default rootReducer;
