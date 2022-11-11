const { User } = require("../db");

const updateUserInDb = async (
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
) => {
  try {
    let user = await User.findByPk(id);

    if (user === null) {
      throw new Error("The user you trying to update does not exists");
    }

    await user.update({
      userName: userName ? userName : user.userName,
      firstName: firstName ? firstName : user.firstName,
      lastName: lastName ? lastName : user.lastName,
      email: email ? email : user.email,
      address: address ? address : user.address,
      password: password ? password : user.password,
      telephone: telephone ? telephone : user.telephone,
      adminPermissions: adminPermissions
        ? adminPermissions
        : user.adminPermissions,
      image: image ? image : user.image,
    });
    await user.save();

    return "Se actualizo correctamente.";
  } catch (error) {
    return error;
  }
};
module.exports = { updateUserInDb };
