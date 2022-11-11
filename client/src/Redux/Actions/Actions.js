import axios from 'axios'
import { SET_CURRENT_PAGE_PRODUCTS, GET_PRODUCTS } from './actionTypes';

export const setProductsPerPage = (currentPage) => {
    return async (dispatch) => {
        if (currentPage) {
            await dispatch({ type: SET_CURRENT_PAGE_PRODUCTS, payload: currentPage });
        }
    };
};


export  function getAllProducts(payload){
    return async function(dispath){
        try{
            var json = await axios.get(`http://localhost:3001/products`);
            return dispath({
                type: 'GET_PRODUCTS',
                payload: json.data
            })
        }catch(error){
            return dispath({
                type: "ERROR",
                payload: error
            })
        }
    }
}
