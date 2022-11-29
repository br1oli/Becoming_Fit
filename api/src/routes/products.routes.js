const { Router } = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProductFromDb,
  logicalDeleteForProduct,
  changeProductStock
} = require("../controllers");

const router = Router();


router.get("/products", getProducts);
router.post("/products", createProduct);
router.put("/products", updateProduct);
router.delete("/product/:id", deleteProductFromDb);
router.put("/productDelete", logicalDeleteForProduct);
router.put("/productStock", changeProductStock);


module.exports = router;
