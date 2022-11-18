const { response, request } = require("express");
const { Category } = require("../db");
const { categoryExists } = require("../helpers/categoryExists");

const getCategories = async (req = request, res = response) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createCategory = async (req = request, res = response) => {
  const { name } = req.body;

  if (!name) return res.status(404).send("¡Missing name from category!");

  try {
    const categories = await Category.findAll();

    const isCategory = categoryExists(
      categories.map(({ name }) => name),
      name
    );

    if (isCategory) return res.status(400).send("¡Category already exists!");

    const newCategory = await Category.create({ name });

    res.send(newCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCategory = async (req = request, res = response) => {
  const { name } = req.query;
  if (!name) {
    return res.status(404).send("¡Name is needed to remove category!");
  }
  try {
    await Category.destroy({
      where: {
        name,
      },
    });
    res.status(200).send(`Category with Name:${name} was successfully removed`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getCategories, createCategory, deleteCategory };
