const { response, request } = require('express');
const { User } = require('../db');

const getUsers = (req = request, res = response) => {
  // traigo todos los clientes de la db y los envio:
  try {
    res.json('test');
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
    telephone,
    adminPermissions,
    image,
  } = req.body;
  // despues hacer una validacion de datos estrictamente necesarios!
  const isDataClient =
    !email && !password && !userName && !address && !telephone;

  if (isDataClient) {
    return res.status(400).send('missing data!');
  }
  try {
    const newUser = await User.create({
      userName,
      firstName,
      lastName,
      email,
      address,
      password,
      telephone,
      adminPermissions,
      image,
    });
    res.send(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateUser = async (req = request, res = response) => {
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
