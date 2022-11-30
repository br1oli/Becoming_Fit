const { response, request } = require("express");
const { ProductCategory } = require("../db");
const { typeExists } = require("../helpers/typeExist");

const getType = async (req = request, res = response) => {
  try {
    const type = await ProductCategory.findAll();
    console.log("TYPE",ProductCategory);
    res.status(200).send(type);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createType = async (req = request, res = response) => {
  const { name } = req.body;

  if (!name) return res.status(404).send("Missing name for a new type");

  try {
    const type = await ProductCategory.findAll();

    const isType = typeExists(
      type.map(({ name }) => name),
      name
    );

    if (isType) return res.status(400).send("This type already exists!");

    const newType = await ProductCategory.create({ name });

    res.status(200).send(newType);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteType = async (req = request, res = response) => {
  const { name } = req.query;
  if (!name) {
    return res.status(404).send("Name is needed to remove type");
  }
  try {
    await ProductCategory.destroy({
      where: {
        name,
      },
    });
    res.status(200).send(`Type named ${name} was successfully removed`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { 
    getType, 
    createType, 
    deleteType 
};