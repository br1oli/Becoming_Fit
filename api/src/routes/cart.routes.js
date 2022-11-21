const { Router } = require("express");
const {
  getCart,
  postProductToCart,
  deleteCart,
  deleteCartProduct,
} = require("../controllers/cart.controllers");
const router = Router();

router.get("/cart", getCart);
router.post("/cart", postProductToCart);
router.delete("/cart", deleteCart);
router.delete("/cartProduct", deleteCartProduct);

module.exports = router;
