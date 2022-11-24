const { Product, Brand, Category, Review } = require("../db");

const getProductById = async (id) => {
  try {
    let foundProduct = await Product.findByPk(id, {
      include: [
        { model: Category, attributes: ["name"] },
        { model: Brand, attributes: ["name"] },
        { model: Review},
      ],
    });

    return foundProduct;
  } catch (error) {
    return error;
  }
};

module.exports = { getProductById };
