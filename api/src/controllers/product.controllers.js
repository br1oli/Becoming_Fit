const { response, request } = require("express");
const { Product } = require("../db");
const {
  getProductsFromDb,
  getProductsByName,
} = require("../helpers/getProductsFromDb");
const { createProductInDb } = require("../helpers/createProduct");
const { updateProductInDb } = require("../helpers/updateProduct");

const getProducts = async (req = request, res = response) => {
  try {
    let { name } = req.query;
    const products = await getProductsFromDb();
    if (!products.length) {
      return res.status(404).send("No products found");
    }

    if (name) {
      let foundProductsByName = await getProductsByName(name);

      if (!foundProductsByName.length) {
        return res.status(404).send("Please enter a valid name");
      }

      return res.status(200).send(foundProductsByName);
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message); 
  }
};

const createProduct = async (req = request, res = response) => {
  try {
    let {
      name,
      type,
      color,
      gender,
      size,
      rating,
      brandName,
      categoryName,
      price,
      description,
      image,
    } = req.body;

    let productsFromDb = await getProductsFromDb();

    if (
      !name ||
      !type ||
      !color ||
      !gender ||
      !size ||
      !rating ||
      !price ||
      !brandName ||
      !categoryName ||
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
      brandName,
      categoryName,
      description,
      image
    );
    res
      .status(201)
      .send(newProduct.dataValues && "Product succesfully created!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateProduct = async (req = request, res = response) => {
  let {
    id,
    name,
    type,
    color,
    gender,
    size,
    rating,
    price,
    description,
    image,
  } = req.body;
  
  try {    
    if (id.length < 20) {
      return res.status(404).send("Invalid ID");
    }

    let update = await updateProductInDb(
      id,
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

    res.status(200).send(update);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProductFromDb = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send("¡ID is needed to remove product!");
  }
  try {
    await Product.destroy({
      where: {
        id,
      },
    });
    res.status(200).send(`Product with ID:${id} was successfully removed`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const changeProductStock = async (req = request, res = response) => {
  const { id, changeStock } = req.body;
    try {
      let product = await Product.findByPk(id);

      if (product === null) {
        throw new Error("The product you trying to update does not exists");
      }

      await product.update({
        outOfStock: changeStock
      })

      await product.save();
      res.status(200).send('The product was updated successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
}

const logicalDeleteForProduct = async (req = request, res = response) => {
  const { id, changeDeleteState } = req.body;
  try {
    let product = await Product.findByPk(id);
    if (product === null) {
      throw new Error("The product you trying to delete does not exists");
    }

    await product.update({
      isDeleted: changeDeleteState
    })
    
    await product.save();
    res.status(200).send('The product was updated successfully');
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProductFromDb,
  changeProductStock,
  logicalDeleteForProduct
};
