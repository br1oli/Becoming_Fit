const { response, request } = require("express");
const { getProductById } = require("../helpers/getDetails");
const getDetail = async (req = request, res = response) => {
  try {
    let { id } = req.params;
    if (id.length < 10) {
      return res.status(400).send("Please enter a valid ID");
    }
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).send("No product found");
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDetail,
};
