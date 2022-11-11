const { Router } = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
} = require("../controllers/product.controllers");

const router = Router();


router.get("/products", getProducts);
router.post("/products", createProduct);
router.put("/products", updateProduct);

module.exports = router;
