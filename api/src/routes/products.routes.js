const { Router } = require('express');
const { getClients } = require('../controllers');

const router = Router();

router.get('/clients', getClients);

module.exports = router;
