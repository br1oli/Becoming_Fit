import { combineReducers } from "redux";
import { products } from "./products";
import { detailProduct } from "./detailProduct";
import { brands } from "./brands";

const reducer = combineReducers({
  products,
  detailProduct,
  brands,
});

export default reducer;

// const initialState = {
//   porducts: [],
//   allProducts: [],
//   brands: [],
//   allBrands: [],
//   details: [],
// };

// function rootReducer(state = initialState, action) {
//   switch (action.type) {
//     case "GET_PRODUCTS":
//       return {
//         ...state,
//         porducts: action.payload,
//         allProducts: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// export default rootReducer;
