const { Router } = require("express");
const {
  createUser,
  deleteUser,
  getUsers,
  updateUserPermissions,
  createUserProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfileByEmail,
  updateUserProfile,
} = require("../controllers");

const router = Router();
router.get("/user", getUsers); //getUsers
router.post("/user", createUser); //createUsers
router.delete("/user/:email", deleteUser); //deleteUser
router.put("/user/:email", updateUserPermissions); //updateUserPermissions
router.get("/userProfiles", getAllUserProfiles); //getAllUserProfiles
router.get("/userProfile", getUserProfileByEmail); //getUserProfileByEmail
router.post("/userProfile", createUserProfile); //createUserProfile
router.put("/userProfile/:email", updateUserProfile); //updateUserProfile
router.delete("/userProfile", deleteUserProfile); //deleteUserProfile

module.exports = router;
