const { Router } = require("express");
const {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  createUserProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfileByEmail,
  updateUserProfile
} = require("../controllers");

const router = Router();
router.get("/user", getUsers); //getUsers
router.post("/user", createUser); //createUsers
router.put("/user/:email", updateUser); //updateUser
router.delete("/user/:email", deleteUser); //deleteUser
router.get("/userProfiles", getAllUserProfiles); //getAllUserProfiles
router.get("/userProfile", getUserProfileByEmail); //getUserProfileByEmail
router.post("/userProfile", createUserProfile); //createUserProfile
router.put("/userProfile", updateUserProfile); //updateUserProfile
router.delete("/userProfile", deleteUserProfile); //deleteUserProfile

module.exports = router;
