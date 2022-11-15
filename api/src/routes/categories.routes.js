const { Router } = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers");

const router = Router();

router.get("/category", getCategories);
router.post("/category", createCategory);
router.put("/category/:id");
router.delete("/category", deleteCategory);
router.get("/category/:name");

module.exports = router;
