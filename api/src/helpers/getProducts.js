const { Product } = require("../db");

const getProductsFromDb = async () => {
  try {
    const products = await Product.findAll();
    /* organizo la data que devuelve la db */
    let organizedData = products.map((product) => product.dataValues);
    return organizedData;
  } catch (error) {
    return error;
  }
};

module.exports = getProductsFromDb;
