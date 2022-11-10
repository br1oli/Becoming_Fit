const { Router } = require("express");
const { getDetail } = require("../controllers/detail.controller");
const router = Router();

router.get("/products/:id", getDetail);

module.exports = router;
