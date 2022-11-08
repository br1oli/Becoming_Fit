
const { response, request } = require("express");
const { getProductsByJson } = require("../helpers/getProductsByJson");
const getProducts = (req = request, res = response) => {
  try {
    const products = getProductsByJson();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getProducts,
};
