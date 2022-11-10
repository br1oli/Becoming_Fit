const initialState = {
  products: [],
  allProducts: [],
  brands: [],
  allBrands: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
