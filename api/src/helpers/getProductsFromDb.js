const { Product } = require("../db");

const getProductsFromDb = async () => {
  try {
    const products = await Product.findAll();
    if (!products) throw new Error("Alert: Empty Db")
    return products;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getProductsFromDb };