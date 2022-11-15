const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("./users.controllers");
const { getOrders } = require("./order.controllers");
const { getProducts } = require("./product.controllers");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("./categories.controllers");

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getOrders,
  getProducts,
  getCategories,
  createCategory,
  deleteCategory,
};
