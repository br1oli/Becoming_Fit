const { response, request } = require("express");
const { CartProduct, Cart, Product, Op } = require("../db");

const getCart = async (req = require, res = response) => {
  let cartUser = await Cart.findOne({
    where: {
      userId: userId,
    },
    include: {
      model: CartProduct,
      include: {
        model: Product,
      },
    },
  });

  try {
    if (cartUser) return res.send(cartUser);
    return res.status(404).send("No products found in cart");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
