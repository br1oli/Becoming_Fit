const { Router } = require("express");
const { postMail } = require("../controllers");
const router = Router();

router.post("/mail", postMail);

module.exports = router;