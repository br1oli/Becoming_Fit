const { Router } = require('express');
const { getUsers } = require('../controllers');

const router = Router();

router.get('/user', getUsers);

module.exports = router;
