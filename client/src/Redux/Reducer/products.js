import {
    GET_PRODUCTS,
    SET_CURRENT_PAGE_PRODUCTS,
} from '../Actions/actionTypes';

const initialState = {
    porducts: [],
    allProducts: [],
    currentProducts: [],
    currentPage: 1,
    productsPerPage: 6,
    indexLastProduct: 6,
    indexFirstProduct: 0,
};

export const products = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_CURRENT_PAGE_PRODUCTS:
            state.currentPage = payload;
            state.indexLastProduct = state.currentPage * state.productsPerPage;
            state.indexFirstProduct = state.indexLastProduct - state.productsPerPage;
            return {
                ...state,
                currentProducts: state.porducts.slice(
                    state.indexFirstProduct,
                    state.indexLastProduct
                ),
            };
        case GET_PRODUCTS:
            return {
                ...state,
                porducts: [...payload],
                allProducts: [...payload],
                currentProducts: [...payload].slice(
                    state.indexFirstProduct,
                    state.indexLastProduct
                ),
            };
        default:
            return state;
    }
};