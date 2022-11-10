const { Product, Op } = require("../db");

const getProductsFromDb = async () => {
  try {
    const products = await Product.findAll();
<<<<<<< HEAD:api/src/helpers/getProductsFromDb.js
    if (!products) throw new Error("Alert: Empty Db")
=======
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

>>>>>>> ff7949de82b90a1616735f3cf5ba0b1b1963910b:api/src/helpers/getProducts.js
    return products;
  } catch (error) {
    return error.message;
  }
};

<<<<<<< HEAD:api/src/helpers/getProductsFromDb.js
module.exports = { getProductsFromDb };
=======
module.exports = { getProductsFromDb, getProductsByName };
>>>>>>> ff7949de82b90a1616735f3cf5ba0b1b1963910b:api/src/helpers/getProducts.js
