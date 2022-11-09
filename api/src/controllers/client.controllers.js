const { response, request } = require('express');
const { Client } = require('../db');

const getClients = (req = request, res = response) => {
  // traigo todos los clientes de la db y los envio:
  try {
    res.json('test');
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createClient = async (req = request, res = response) => {
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
    const newClient = await Client.create({
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
    res.send(newClient);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateClient = async (req = request, res = response) => {
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
    const client = await Client.findByPk(id);
    client.userName = userName;
    client.address = address;
    client.firstName = firstName;
    client.lastName = lastName;
    client.telephone = telephone;
    client.email = email;
    client.password = password;
    client.adminPermissions = adminPermissions;
    // pensar si viene una img, si no existe, por default se carga una con sequelize!
    client.image = image;
    client.save();
    res.json(client);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteClient = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    await Client.destroy({
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
  getClients,
  createClient,
  updateClient,
  deleteClient,
};
