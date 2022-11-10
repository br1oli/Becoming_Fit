const { response, request } = require("express");
const getProductsFromDb = require("../helpers/getProducts");
const getProducts = async (req = request, res = response) => {
  try {
    let { name } = req.query;
    const products = await getProductsFromDb();
    if (!products.length) {
      return res.status(404).send("No products found");
    }

    if (name) {
      let foundProductByName = products.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );

      return res.status(200).send(foundProductByName);
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getProducts,
};
