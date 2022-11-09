const { Router } = require("express");
const { getProducts } = require("../controllers");

const router = Router();

router.get("/products", getProducts);

module.exports = router;
