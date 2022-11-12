import {
  URL_PRODUCTS,
  URL_PRODUCTS_QUERY,
  GET_PRODUCTS,
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
  POST_REVIEW,
  DELETE_OWN_REVIEW,
  EDIT_OWN_REVIEW,
  GET_NAME_PRODUCTS,
} from "../Actions/Const";

const initialState = {
  products: [],
  allProducts: [],
  brands: [],
  allBrands: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    case GET_NAME_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    /*     case FILTER_PRICES:
      const allProducts = state.products;
      let priceFilter;
      if (action.payload === "all") {
        return (priceFilter = allProducts);
      } else if (action.payload === "<50") {
        return (priceFilter = allProducts.filter((p) => p.price < 50));
      } else if (action.payload === "50 - 100") {
        return (priceFilter = allProducts.filter(
          (p) => p.price > 50 && p.price < 100
        ));
      } else if (action.payload === ">100") {
        return (priceFilter = allProducts.filter((p) => p.price > 100));
      }
      return {
        ...state,
        products: priceFilter,
      }; */
    case ORDER_BY_NAME:
      const sortedArr =
        action.payload === "asc"
          ? state.products.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              } else if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.products.sort(function (a, b) {
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
      };
    case ORDER_BY_PRICE:
      const priceOrder =
        action.payload === "asc"
          ? state.products.sort(function (a, b) {
              if (a.price > b.price) {
                return 1;
              } else if (a.price < b.price) {
                return -1;
              }
              return 0;
            })
          : state.products.sort(function (a, b) {
              if (a.price < b.price) {
                return 1;
              } else if (a.price > b.price) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        products: priceOrder,
      };
    case FILTER_GENDER:
      const allProducts = state.allProducts;
      const genderFiltered =
        action.payload === "all"
          ? allProducts
          : allProducts.filter(
              (e) => e.gender.toLowerCase() === action.payload.toLowerCase()
            );
      return {
        ...state,
        products: genderFiltered,
      };
    case FILTER_SIZE:
      const sizeFiltered =
        action.payload === "all"
          ? state.allProducts
          : state.allProducts.filter((p) => p.size.includes(action.payload));
      return {
        ...state,
        products: sizeFiltered,
      };
    case FILTER_BRAND:
      const brandFiltered =
        action.payload === "all" ? state.allProducts : state.allProducts;
      return {
        ...state,
        products: brandFiltered,
      };
      case 'GET_DETAILS':
        return {
          ...state,
          details: action.payload,
        };
    default:
      return state;
  }
}

export default rootReducer;
