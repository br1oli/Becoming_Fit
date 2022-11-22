const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("./users.controllers");
const { getCart,postProductToCart , deleteCart, deleteCartProduct}= require('./cart.controllers')
const { getFavorites, postFavorites, deleteOneFavorites, putFavorites, deleteAllFavorites } = require("./favorites.controllers");
const { getOrders } = require("./order.controllers");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProductFromDb,
} = require("./product.controllers");
const {getDetail}= require('./detail.controller')
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
  createProduct,
  updateProduct,
  deleteProductFromDb,
  getDetail,
  getCategories,
  createCategory,
  deleteCategory,
  getCart,postProductToCart , deleteCart, deleteCartProduct,
  getFavorites, postFavorites, deleteOneFavorites, putFavorites, deleteAllFavorites
};
