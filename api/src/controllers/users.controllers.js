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
  const {
    userName,
    firstName,
    lastName,
    email,
    address,
    password,
    zipCode,
    telephone,
    adminPermissions,
    image,
  } = req.body;

  const isDataClient =
    !email ||
    !password ||
    !userName ||
    !address ||
    !telephone ||
    !adminPermissions ||
    !firstName ||
    !zipCode ||
    !lastName;

  if (isDataClient) {
    return res.status(400).send("missing data!");
  }
  try {
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists !== null) {
      return res.status(404).send("That user already exists, try a new one");
    }
    const newUser = await User.create({
      userName,
      firstName,
      lastName,
      email,
      address,
      password,
      zipCode,
      telephone,
      adminPermissions,
      image,
    });
    res.status(201).send(newUser.dataValues && "User succesfully created");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  // pensar que queremos que se modifique del client: hay que restringir a que vengan si o si los datos, si no, hacetr una funcion que me divida los que si existen y los que no existen!
  const {
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
  try {
    const user = await User.findByPk(id);
    user.userName = userName;
    user.address = address;
    user.firstName = firstName;
    user.lastName = lastName;
    user.telephone = telephone;
    user.email = email;
    user.password = password;
    user.adminPermissions = adminPermissions;
    // pensar si viene una img, si no existe, por default se carga una con sequelize!
    user.image = image;
    user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
}; */

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
