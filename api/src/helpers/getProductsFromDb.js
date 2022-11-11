const { Product, Op, Brand, Category } = require("../db");

const getProductsFromDb = async () => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ["name"] },
        { model: Brand, attributes: ["name"] },
      ],
    });
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

      include: [
        { model: Category, attributes: ["name"] },
        { model: Brand, attributes: ["name"] },
      ],
    });

    products = products.map((p) => p.dataValues);

    return products;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getProductsFromDb, getProductsByName };
