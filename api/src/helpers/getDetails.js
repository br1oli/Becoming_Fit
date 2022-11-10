const { Product } = require("../db");

const getProductById = async (id) => {
  try {
    let foundProduct = Product.findByPk(id);

    return foundProduct;
  } catch (error) {
    return error;
  }
};

module.exports = { getProductById };
