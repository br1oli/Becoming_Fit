const {
  getUsers,
  createUser,
  deleteUser,
  updateUserPermissions,
  createUserProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfileByEmail,
  updateUserProfile,
} = require("./users.controllers");
const {
  getCart,
  postProductToCart,
  deleteCart,
  deleteCartProduct,
} = require("./cart.controllers");
const {
  getFavorites,
  postFavorites,
  deleteOneFavorites,
  putFavorites,
  deleteAllFavorites,
} = require("./favorites.controllers");
const {
  getAllOrders,
  saveOrderInDB,
  changeOrderStatus,
  getOrderDetail,
} = require("./order.controllers");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProductFromDb,
  changeProductStock,
  logicalDeleteForProduct
} = require("./product.controllers");
const { getDetail } = require("./detail.controller");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("./categories.controllers");

const {
  getReviews,
  postReview,
  deleteOneReview,
  putReview,
  deleteAllReviews,
} = require("./reviews.controllers");

const { postMail } = require("./mailing.controllers");

const { postMailDeliver } = require("./deliver.controllers");

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUserPermissions,
  getAllOrders,
  changeOrderStatus,
  saveOrderInDB,
  getOrderDetail,
  getProducts,
  createProduct,
  updateProduct,
  deleteProductFromDb,
  changeProductStock,
  logicalDeleteForProduct,
  getDetail,
  getCategories,
  createCategory,
  deleteCategory,
  getCart,
  postProductToCart,
  deleteCart,
  deleteCartProduct,
  getFavorites,
  postFavorites,
  deleteOneFavorites,
  putFavorites,
  deleteAllFavorites,
  getReviews,
  postReview,
  deleteOneReview,
  putReview,
  deleteAllReviews,
  createUserProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfileByEmail,
  updateUserProfile,
  postMail,
  postMailDeliver,
};
