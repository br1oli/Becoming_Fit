const { response, request } = require("express");
const { User, UserProfile, Op } = require("../db");

// User

const getUsers = async (req = request, res = response) => {
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

const updateUserPermissions = async (req = request, res = response) => {
  const { email } = req.params;
  const { isBanned, adminPermissions, resetPassword } = req.body;
  try {
    const userToUpdate = await User.findOne({ where: { email: email } });

    await userToUpdate.update({
      email: userToUpdate.email,
      isBanned: isBanned === true ? true : false,
      adminPermissions: adminPermissions === true ? true : false,
      resetPassword: resetPassword === true ? true : false,
    });
    await userToUpdate.save();

    //retorno todos los usuarios para no volverme loca en el reducer del front
    const allUsers = await User.findAll();

    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// User Profile

const createUserProfile = async (req = request, res = response) => {
  const { name, email, adress, country, city, zipCode, phone } = req.body;

  try {
    const userExists = await UserProfile.findOne({
      where: { email: email },
    });

    if (userExists !== null) {
      return res.status(200).send(userExists);
    } else {
      const userRelated = await User.findByPk(email);

      const newUserProfile = await UserProfile.create({
        name,
        email,
        phone,
        adress,
        country,
        city,
        zipCode,
      });

      if (userRelated) {
        await userRelated.setUserProfile(newUserProfile);
      }

      return res.status(201).send(newUserProfile);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteUserProfile = async (req = request, res = response) => {
  const { email } = req.query;
  try {
    await UserProfile.destroy({
      where: {
        email,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAllUserProfiles = async (req = request, res = response) => {
  try {
    let usersFromDb = await UserProfile.findAll();
    if (!usersFromDb.length) {
      return res.status(404).send("No user profiles found");
    }
    usersFromDb = usersFromDb.map((user) => user.dataValues);
    res.status(200).send(usersFromDb);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserProfileByEmail = async (req = request, res = response) => {
  const { email } = req.query;
  try {
    let usersFromDb = await UserProfile.findOne({ where: { email: email } });
    if (!usersFromDb) {
      return res.status(404).send("No users found");
    }
    res.status(200).send(usersFromDb.dataValues);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateUserProfile = async (req = request, res = response) => {
  let { email } = req.params;
  let { name, country, city, zipCode, phone, adress } = req.body;

  const targetUserProfile = await UserProfile.findByPk(email);

  try {
    const updateUserProfile = await targetUserProfile.update({
      name: name? name : targetUserProfile.name,
      country: country? country: targetUserProfile.country,
      city: city? city : targetUserProfile.city,
      zipCode: zipCode? zipCode : targetUserProfile.zipCode,
      phone: phone? phone : targetUserProfile.zipCode,
      adress: adress? adress : targetUserProfile.adress,
    });

    await updateUserProfile.save();
    res.status(200).send("Se actualizo la informacion con exito");
  } catch (error) {
    res.status(404).send("No se pudo actualizar la informacion");
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUserPermissions,
  createUserProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfileByEmail,
  updateUserProfile,
};
