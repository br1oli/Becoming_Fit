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
  const { name } = req.query;

  if (!name) return res.status(404).send("¡Missing name from category!");

  try {
    const categories = await Category.findAll();

    const [newCategory, created] = await Category.findOrCreate({ where: {name:name} });

    res.send(newCategory.dataValues);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.query;
  if (!id) {
    return res.status(404).send("¡Name is needed to remove category!");
  }
  try {
    let deleteCategory = await Category.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({Deleted: deleteCategory, id: id});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getCategories, createCategory, deleteCategory };
