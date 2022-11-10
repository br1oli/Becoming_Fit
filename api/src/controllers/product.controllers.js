<<<<<<< HEAD
const { response, request } = require('express');
=======
const { response, request } = require("express");
const {
  getProductsFromDb,
  getProductsByName,
} = require("../helpers/getProductsFromDb");
const { createProductInDb } = require("../helpers/createProduct");
const getProducts = async (req = request, res = response) => {
  try {
    let { name } = req.query;
    const products = await getProductsFromDb();
    if (!products.length) {
      return res.status(404).send("No products found");
    }

    if (name) {
      let foundProductsByName = await getProductsByName(name);
>>>>>>> eb1b9b4d9f0287341671ef2e2f9211da45070bb0

const getProducts = (req = request, res = response) => {
  try {
    res.json('test');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req = request, res = response) => {
  try {
    let { name, type, color, gender, size, rating, price, description, image } =
      req.body;

    console.log("soy body", req.body);
    let productsFromDb = await getProductsFromDb();

    if (
      !name ||
      !type ||
      !color ||
      !gender ||
      !size ||
      !rating ||
      !price ||
      !description ||
      !image
    ) {
      return res.status(400).send("Please enter all the data");
    }
    if (productsFromDb.length && productsFromDb.some((e) => e.name === name)) {
      return res
        .status(400)
        .send("That product was already created, try with a new one");
    }

    let newProduct = await createProductInDb(
      name,
      type,
      color,
      gender,
      size,
      rating,
      price,
      description,
      image
    );
    res.status(201).send(newProduct && "Product succesfully created!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getProducts,
  createProduct,
};
