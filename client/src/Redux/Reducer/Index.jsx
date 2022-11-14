import {
  URL_PRODUCTS,
  URL_PRODUCTS_QUERY,
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
  POST_REVIEW,
  DELETE_OWN_REVIEW,
  EDIT_OWN_REVIEW,
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
} from "../Actions/Const";

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
  shoppingCart: [],
  totalItemsInCart: 0,
  totalToPay: 0,
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
          ? state.allProducts
          : state.allProducts.filter(
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

    // Shopping cart reducer functions
    case ADD_PRODUCT_TO_CART:
      let newItem = state.allProducts.find(
        (item) => item.id === action.payload
      );

      let itemInCart = state.shoppingCart.find(
        (item) => item.id === newItem.id
      );
      let totalItemsAdded = state.shoppingCart
        .map((item) => item.quantity)
        .reduce((acc, item) => (acc += item), 1);

      let conditionalAddState = itemInCart
        ? {
            ...state,
            shoppingCart: state.shoppingCart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            totalItemsInCart: totalItemsAdded,
          }
        : {
            ...state,
            shoppingCart: [...state.shoppingCart, { ...newItem, quantity: 1 }],
            totalItemsInCart: totalItemsAdded,
          };

      return conditionalAddState;
    case REMOVE_ALL_FROM_CART:
      let deletedItem = state.shoppingCart.find(
        (item) => item.id === action.payload
      );

      let remainedProducts = state.shoppingCart.filter(
        (item) => item.id !== action.payload
      );

      let totalItemsRemainedInCart =
        state.shoppingCart
          .map((item) => item.quantity)
          .reduce((acc, item) => (acc += item), 0) - deletedItem.quantity;

      return {
        ...state,
        shoppingCart: remainedProducts,
        totalItemsInCart: totalItemsRemainedInCart,
      };
    case REMOVE_ONE_FROM_CART:
      let itemToDelete = state.shoppingCart.find(
        (item) => item.id === action.payload
      );
      let totalItemsRemained = state.shoppingCart
        .map((item) => item.quantity - 1)
        .reduce((acc, item) => (acc += item), 0);

      let conditionalRemoveState =
        itemToDelete.quantity > 1
          ? {
              ...state,
              shoppingCart: state.shoppingCart.map((item) =>
                item.id === action.payload
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
              totalItemsInCart: totalItemsRemained,
            }
          : {
              ...state,
              shoppingCart: state.shoppingCart.filter(
                (item) => item.id !== action.payload
              ),
              totalItemsInCart: totalItemsRemained,
            };
      return conditionalRemoveState;
    case CLEAR_CART:
      return { ...state, shoppingCart: [] };
    default:
      return state;
  }
}

export default rootReducer;
