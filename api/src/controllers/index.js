const { getClients } = require('./client.controllers');
const { getOrders } = require('./order.controllers');
const { getProducts } = require('./product.controllers');

module.exports = {
  getClients,
  getOrders,
  getProducts,
};
