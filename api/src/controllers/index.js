const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require('./users.controllers');
const { getOrders } = require('./order.controllers');
const { getProducts } = require('./product.controllers');

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getOrders,
  getProducts,
};
