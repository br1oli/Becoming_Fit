const getProductsFromDb = require("./getProducts");

const getProductById = async (id) => {
  try {
    /* uso getProducts para ver si existe un producto con el id que va a llegar, podria ser lo mismo usando findAll con condicion pero me parecio mas simple manipularlo asi, (si quieren lo cambiamos )*/
    const allProducts = await getProductsFromDb();
    let foundProduct = allProducts.find((p) => p.id === id);

    return foundProduct;
  } catch (error) {
    return error;
  }
};
module.exports = { getProductById };
