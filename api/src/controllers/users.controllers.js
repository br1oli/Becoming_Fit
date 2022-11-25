const { response, request } = require("express");
// const { default: Profile } = require("../../../client/src/Components/Auth/user-info");
const { User, UserProfile } = require("../db");
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


const getUserAct = async (req = request, res = response) => {
  // traigo todos los clientes de la db y los envio:
  const { email } = req.query
  try {
    let usersFromDb = await UserProfile.findOne({ where: { email: email } });
    if (!usersFromDb) {
      return res.status(404).send("No users found");
    }
    res.status(200).send(usersFromDb.dataValues);
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message);
  }
};

const actUser = async (req = request, res = response) => {
  const { name,
    email,
    adress,
    country,
    city,
    zipCode,
    phone } = req.body


  try {
    const userExists = await UserProfile.findOne({ where: { email: email } });

    if (userExists !== null) {
      return res.status(200).send(userExists.dataValues);
    } else {
      const newUser = await UserProfile.create({
        name,
        email,
        phone,
        adress,
        country,
        city,
        zipCode
      });
      res.status(201).send(newUser.dataValues);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message);
  }
};

const updateProfile = async (req = request, res = response) => {
  let emailId = req.query.email;
  console.log("email id", req.query)
  let { name, country, city, zipCode, phone, adress } = req.body;
  try {
    // const targetReview = await UserProfile.findByPk(emailId);
    // console.log("target review", targetReview)
    const updateReview = await UserProfile.update({
      name,
      country,
      city,
      zipCode,
      phone,
      adress
    }, {
      where: {
          email: emailId,
      }
  });
    console.log("esto es el coso", updateReview)
    res.status(200).send('Se actualizo la informacion con exito')
  } catch (error) {
    console.log("esto es el error", error)
    res.status(404).send('No se pudo actualizar la informacion')
  }
};

module.exports = {
  actUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserAct,
  updateProfile,
};
