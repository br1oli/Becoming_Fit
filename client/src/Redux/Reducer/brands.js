import { GET_BRANDS } from '../Actions/actionTypes';

const initialState = {
    brands: {},
};

export const brands = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_BRANDS:
            return {
                ...state,
                brands: payload,
            };
        default:
            return state;
    }
};