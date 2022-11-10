const { response, request } = require("express");
<<<<<<< HEAD
const { getProductsFromDb, saveProductsInDb } = require("../helpers");

const getProducts = (req = request, res = response) => {
=======
const {
  getProductsFromDb,
  getProductsByName,
} = require("../helpers/getProducts");
const getProducts = async (req = request, res = response) => {
>>>>>>> ff7949de82b90a1616735f3cf5ba0b1b1963910b
  try {
    let { name } = req.query;
    const products = await getProductsFromDb();
    if (!products.length) {
      return res.status(404).send("No products found");
    }

    if (name) {
      let foundProductsByName = await getProductsByName(name);

      if (!foundProductsByName) {
        return res.status(404).send("Please enter a valid name");
      }

      return res.status(200).send(foundProductsByName);
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getProducts,
};
