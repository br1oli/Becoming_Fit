const { Product } = require("../db");

const getProductsFromDb = async () => {
  try {
    const products = await Product.findAll();

    return products;
  } catch (error) {
    return error;
  }
};

module.exports = getProductsFromDb;
