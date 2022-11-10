// import axios from 'axios'

// export  function getAllProducts(payload){
//     return async function(dispath){
//         try{
//             var json = await axios.get(`http://localhost:3001/products`);
//             return dispath({
//                 type: "GET_PRODUCTS",
//                 payload: json.data
//             })
//         }catch(error){
//             console.log(error, "error al traer los productos")
//             return dispath({
//                 type: "ERROR",
//                 payload: error
//             })
//         }
//     }
// }