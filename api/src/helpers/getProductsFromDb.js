const { Product, Op } = require("../db");

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
const getProductsByName = async (name) => {
  try {
    let products = await Product.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });

    products = products.map((p) => p.dataValues);

    return products;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getProductsFromDb, getProductsByName };
