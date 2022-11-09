const { Router } = require('express');
const {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers');

const router = Router();
router.get('/clients', getClients);
router.post('/clients/:email', createClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

module.exports = router;
