const data = require("../data.json");
const { Product } = require("../db");

const saveProductsInDb = async () => {
  try {
    await Product.bulkCreate(data, { validate: true });
  } catch (error) {
    return error;
  }
};

module.exports = { saveProductsInDb };
