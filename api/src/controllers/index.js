const {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} = require('./client.controllers');
const { getOrders } = require('./order.controllers');
const { getProducts } = require('./product.controllers');

module.exports = {
  getClients,
  getOrders,
  getProducts,
  createClient,
  updateClient,
  deleteClient,
};
