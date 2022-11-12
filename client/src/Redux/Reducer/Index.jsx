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
  ERROR,
  SET_CURRENT_PAGE_PRODUCTS,
  FILTER_UNIQUECATEGORIES
} from "../Actions/Const";

const initialState = {
  products: [],
  allProducts: [],
  //pagination:
  currentProducts: [],
  currentPage: 1,
  productsPerPage: 6,
  indexLastProduct: 6,
  indexFirsProduct: 0,
  //
  brands: [],
  allBrands: [],
  details: [],
  error: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
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
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        // logic from pagination:
        currentProducts: [...action.payload].slice(
          state.indexFirsProduct,
          state.indexLastProduct
        ),
      };
      case FILTER_UNIQUECATEGORIES:
        const allProducts3 = state.allProducts;
        var categoriesExtracted = allProducts3.map((e)=> {
          return e.category.name
        })
        const uniqueCategories = categoriesExtracted.filter((value, indice)=> {
          return categoriesExtracted.indexOf(value) === indice;
        })
        return{
          ...state,
          categories: uniqueCategories
        }
      case GET_BRAND:
        const allProducts2 = state.allProducts;
        var brandsExtracted = allProducts2.map((e)=> {
          return e.brand.name
        })
        const uniqueBrands = brandsExtracted.filter((value, indice)=> {
          return brandsExtracted.indexOf(value) === indice;
        })
        return{
          ...state,
          brands: uniqueBrands
        }
    case GET_NAME_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    // NO RENDERIZA LAS CARDS

    case FILTER_PRICES:
      const priceFiltered = state.allProducts;
      let priceFilter;
      if (action.payload === "all") {
        priceFilter = [...priceFiltered];
        return priceFilter;
      } else if (action.payload === "<50") {
        priceFilter = [...priceFiltered].filter((p) => p.price < 50);
        return priceFilter;
      } else if (action.payload === "50 - 100") {
        priceFilter = [...priceFiltered].filter(
          (p) => p.price > 50 && p.price < 100
        );
        return priceFilter;
      } else if (action.payload === ">100") {
        priceFilter = [...priceFiltered].filter((p) => p.price > 100);
        return priceFilter;
      }
      return {
        ...state,
        products: priceFilter,
      };
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
        action.payload === "all"
          ? state.allProducts
          : state.allProducts.filter(
              (b) => b.brand.name.toLowerCase() === action.payload.toLowerCase()
            );
      return {
        ...state,
        products: brandFiltered,
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
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
