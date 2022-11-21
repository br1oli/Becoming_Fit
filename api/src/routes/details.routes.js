const { Router } = require("express");
const { getDetail } = require("../controllers");
const router = Router();

router.get("/products/:id", getDetail);

module.exports = router;
