const { response, request } = require("express");
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
  console.log("query", req.query)
  const {email} = req.query
  console.log(`email ${email}`)

  try {
    let usersFromDb = await UserProfile.findOne({ where: { email: email }});
    console.log(` esto me devuelve el match de email ${usersFromDb}`)
    if (!usersFromDb) {
      return res.status(404).send("No users found");
    }
    res.status(200).send(usersFromDb.dataValues);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const actUser = async (req = request, res = response) => {
 const {name,
   email, 
   adress, 
   country, 
   city, 
   zipCode,
   phone} = req.body

  // if (!email.length) {
  //   return res.status(400).send("No email provided");
  // }
  // if (!name.length) {
  //   return res.status(400).send("No name provided");
  // }
  // if (!adress.length) {
  //   return res.status(400).send("No adress provided");
  // }
  // if (!country.length) {
  //   return res.status(400).send("No country provided");
  // }
  // if (!city.length) {
  //   return res.status(400).send("No city provided");
  // }
  // if (!zipCode.length) {
  //   return res.status(400).send("No zipCode provided");
  // }
  // if (!phone.length) {
  //   return res.status(400).send("No phone provided");
  // }

  try {
    const userExists = await UserProfile.findOne({ where: { email: email } });

    if (userExists !== null) {
      return res.status(200).send(userExists.dataValues);
    }else{
    const newUser = await UserProfile.create({
      name,
      email,
      phone,
      adress,
      country,
      city,
      zipCode
    });
    console.log(newUser.dataValues)
    res.status(201).send(newUser.dataValues);
  }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  actUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserAct
};
