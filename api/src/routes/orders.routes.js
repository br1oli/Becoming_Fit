const { Router } = require("express");
const {
  getAllOrders,
  saveOrderInDB,
  getOrderDetail,
  changeOrderStatus,
} = require("../controllers");
const router = Router();

router.get("/order", getAllOrders);
router.get("/order/:id", getOrderDetail);
router.post("/order", saveOrderInDB);
router.put("/order/:id", changeOrderStatus);

module.exports = router;
