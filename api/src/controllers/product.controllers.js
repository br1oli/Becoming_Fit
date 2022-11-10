const { response, request } = require("express");
const { getProductsFromDb, saveProductsInDb } = require("../helpers");

const getProducts = (req = request, res = response) => {
  try {
    const products = getProductsFromDb();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getProducts,
};
