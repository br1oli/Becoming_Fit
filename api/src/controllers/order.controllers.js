const { response, request } = require("express");
const {
  Order,
  PurchasedProduct,
  Product,
  User,
  UserProfile,
} = require("../db");

const getAllOrders = async (req = request, res = response) => {
  try {
    const orders = await Order.findAll({
      include: { model: PurchasedProduct, include: { model: Product } },
    });

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
    const orderDetail = await Order.findOne({
      where: { id: id },
      include: { model: PurchasedProduct },
    });

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
    let { email } = req.query;
    let { date_created, items, payer } = req.body;

    let user = await User.findOne({
      where: { email: email },
      include: {
        model: UserProfile,
      },
    });

    let totalItems = items?.length
      ? items.map((i) => i.quantity).reduce((acc, elem) => (acc += elem))
      : items.quantity;
    let totalToPay = items?.length
      ? items
          .map((i) => i.quantity * i.unit_price)
          .reduce((acc, elem) => (acc += elem))
      : items.unit_price;

    let orderToSave = await Order.create({
      totalQuantity: totalItems,
      totalToPay: totalToPay,
      address: [payer.address.zip_code, payer.address.street_name].join(", "),
      phone: payer.phone.number,
      shippingDate: date_created,
    });

    let createPurchasedProductsInDb = items.map(async (element) => {
      let matchProduct = await Product.findByPk(element.id);

      let purchasedProduct = await PurchasedProduct.create({
        name: element.title,
        quantity: element.quantity,
        color: element.description,
        size: element.category_id,
        productId: element.id,
        userEmail: email,
      });

      if (matchProduct) {
        await matchProduct.addPurchasedProduct(purchasedProduct);
      }
      await orderToSave.addPurchasedProduct(purchasedProduct);
    });

    if (user) {
      await user.addOrder(orderToSave);
    }

    res.status(201).send("Order successfully created");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getOrdersForUser = (req = request, res = response) => {
  let { userEmail } = req.query;
  try {
    const userOrders = Order.findAll({
      where: { userEmail: userEmail },
      include: { model: PurchasedProduct },
    });

    if (!userOrders.length) {
      return res.status(404).send("No orders yet...");
    }

    res.status(200).send(userOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderDetail,
  changeOrderStatus,
  saveOrderInDB,
  getOrdersForUser,
};
