const { Router } = require('express');
const { getClients } = require('../controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/', getClients);

module.exports = router;
