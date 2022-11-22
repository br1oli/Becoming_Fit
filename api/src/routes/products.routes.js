const { Router } = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProductFromDb
} = require("../controllers");

const router = Router();


router.get("/products", getProducts);
router.post("/products", createProduct);
router.put("/products", updateProduct);
router.delete("/product/:id", deleteProductFromDb);

module.exports = router;
