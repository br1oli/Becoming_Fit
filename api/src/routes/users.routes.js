const { Router } = require("express");
const {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} = require("../controllers");

const router = Router();
router.get("/user", getUsers);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
