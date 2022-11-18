const { Product, Brand, Category } = require("../db");

const getProductById = async (id) => {
  try {
    let foundProduct = Product.findByPk(id, {
      include: [
        { model: Category, attributes: ["name"] },
        { model: Brand, attributes: ["name"] },
      ],
    });

    return foundProduct;
  } catch (error) {
    return error;
  }
};

module.exports = { getProductById };
