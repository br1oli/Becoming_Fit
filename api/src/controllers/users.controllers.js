const { response, request } = require("express");
const { User } = require("../db");
const { updateUserInDb } = require("../helpers/updateUser");

const getUsers = async (req = request, res = response) => {
  // traigo todos los clientes de la db y los envio:
  try {
    let usersFromDb = await User.findAll();

    if (!usersFromDb.length) {
      return res.status(404).send("No users found");
    }

    usersFromDb = usersFromDb.map((user) => user.dataValues);
    res.status(200).send(usersFromDb);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createUser = async (req = request, res = response) => {
  const { email } = req.query;

  if (!email.length) {
    return res.status(400).send("No email provided");
  }
  try {
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists !== null) {
      return res.status(200).send(userExists.dataValues);
    }
    const newUser = await User.create({
      email,
    });
    res.status(201).send(newUser.dataValues);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    let { id } = req.params;
    let {
      userName,
      firstName,
      lastName,
      email,
      address,
      password,
      telephone,
      adminPermissions,
      image,
    } = req.body;

    let update = await updateUserInDb(
      id,
      userName,
      firstName,
      lastName,
      email,
      address,
      password,
      telephone,
      adminPermissions,
      image
    );

    res.status(200).send(update);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
