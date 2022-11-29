const { Router } = require("express");
const { postMailDeliver } = require("../controllers");
const router = Router();

router.post("/mailDeliver", postMailDeliver);

module.exports = router;