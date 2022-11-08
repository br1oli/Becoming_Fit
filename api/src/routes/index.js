const { Router } = require('express');
const { getClients, getOrders, getProducts } = require('../controllers');

const router = Router();
// routes clients:
router.get('/clients', getClients);
// routes orders:
router.get('/orders', getOrders);
// routes products:
router.get('/products', getProducts);

module.exports = router;
