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
  SUCCESS,
  ERROR,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  SET_CURRENT_PAGE_PRODUCTS,
  FILTER_UNIQUECATEGORIES,
  FILTER_UNIQUEGENDER,
} from "../Actions/Const";

const initialState = {
  products: [],
  allProducts: [],
  brands: [],
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
  uniqueGenero: [],
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
    case FILTER_UNIQUECATEGORIES:
      const allProducts3 = state.allProducts;
      var categoriesExtracted = allProducts3.map((e) => {
        return e.category.name;
      });
      const uniqueCategories = categoriesExtracted.filter((value, indice) => {
        return categoriesExtracted.indexOf(value) === indice;
      });
      return {
        ...state,
        categories: uniqueCategories,
      };

    case FILTER_UNIQUEGENDER:
      const allProducts4 = state.allProducts;
      var gendersExtracted = allProducts4.map((e) => {
        return e.gender;
      });
      const uniqueGenders = gendersExtracted.filter((value, indice) => {
        return gendersExtracted.indexOf(value) === indice;
      });
      return {
        ...state,
        uniqueGenero: uniqueGenders,
      };

    case GET_BRAND:
      const allProducts2 = state.allProducts;
      var brandsExtracted = allProducts2.map((e) => {
        return e.brand.name;
      });
      const uniqueBrands = brandsExtracted.filter((value, indice) => {
        return brandsExtracted.indexOf(value) === indice;
      });
      return {
        ...state,
        brands: uniqueBrands,
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
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...priceFilter].slice(0, 6),
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
        currentPage: 1,
        indexFirsProduct: 0,
        currentProducts: [...sortedArr].slice(0, 6),
      };
    case ORDER_BY_PRICE:
      const priceOrder =
        action.payload === "asc"
          ? state.products.sort(function (a, b) {
              if (parseInt(a.price) > parseInt(b.price)) {
                return 1;
              } else if (parseInt(a.price) < parseInt(b.price)) {
                return -1;
              }
              return 0;
            })
          : state.products.sort(function (a, b) {
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
      const genderFilter = state.products;
      const genderFiltered =
        action.payload === "all"
          ? allProducts
          : allProducts.filter(
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
          : state.products.filter(
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
          : state.products.filter(
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
    default:
      return state;
  }
}

export default rootReducer;
