const { response, request } = require("express");
const { Order, PurchasedProduct, Product } = require("../db");

const getAllOrders = async (req = request, res = response) => {
  try {
    const orders = await Order.findAll();

    if (!orders.length) {
      return res.status(404).send("No orders yet...");
    }

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getOrderDetail = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const orderDetail = await Order.findByPk(id);

    if (!orderDetail) {
      return res.status(404).send("Order not found...");
    }

    res.status(200).send(orderDetail);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const changeOrderStatus = async (req = request, res = response) => {
  let { id } = req.params;
  let { status } = req.body;
  try {
    const orderToUpdate = await Order.findByPk(id);

    if (!orderToUpdate) {
      return res.status(404).send("Order not found...");
    }

    await orderToUpdate.update({
      status: status,
    });
    await orderToUpdate.save();
    const allOrdersWithUpdate = await Order.findAll();

    res.status(200).send(allOrdersWithUpdate);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const saveOrderInDB = async (req = request, res = response) => {
  try {
    let { date_created, items } = req.body;

    let totalItems =
      items?.length > 1
        ? items.map((i) => i.quantity).reduce((acc, elem) => (acc += elem))
        : items[0].quantity;

    let totalToPay =
      items?.length > 1
        ? items
            .map((i) => i.amount * i.unit_price)
            .reduce((acc, elem) => (acc += elem))
        : items[0].unit_price;

    let orderToSave = await Order.create({
      totalQuantity: totalItems,
      totalToPay: totalToPay,
      shippingDate: date_created,
    });

     res.status(201).send("Order successfully created");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* const getOrdersForUser = (req = request, res = response) => {
  try {
    const orders = Order.findAll();

    if (!orders.length) {
      return res.status(404).send("No orders yet...");
    }

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

module.exports = {
  getAllOrders,
  getOrderDetail,
  changeOrderStatus,
  saveOrderInDB,
  //getOrdersForUser,
};
