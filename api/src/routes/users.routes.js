const { Router } = require("express");
const {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  actUser,
  getUserAct
} = require("../controllers");

const router = Router();
router.get("/user", getUsers);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/usuarios", getUserAct)
router.post("/usuarios", actUser)

module.exports = router;
