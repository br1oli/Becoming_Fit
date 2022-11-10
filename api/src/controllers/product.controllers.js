const { response, request } = require("express");
const getProductsFromDb = require("../helpers/getProducts");
const getProducts = async (req = request, res = response) => {
  try {
    const products = await getProductsFromDb();
    if (!products.length) {
      return res.status(404).send("No products found");
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getProducts,
};
