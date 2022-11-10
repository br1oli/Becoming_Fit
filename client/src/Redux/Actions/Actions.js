import axios from "axios";

export function getAllProducts(){
    return async function(dispatch){
    try {
            const products = axios.get('http://localhost:3001/products')
            dispatch({
                type: "GET_PRODUCTS",
                payload: products.data
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: "ERROR",
                payload: error
            })
        }
    
        
    }
    
}