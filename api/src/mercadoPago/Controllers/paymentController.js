const axios = require("axios");
const { Cart, CartProduct, Product, Brand, UserProfile } = require("../../db");

class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async getMercadoPagoLink(req, res) {
    const { userEmail } = req.query;
    try {
      let userData = await UserProfile.findOne({
        where: { email: userEmail },
      });

      let productList = await Cart.findAll({
        where: {
          userEmail: userEmail,
        },
        include: {
          model: CartProduct,
          include: {
            model: Product,
            include: {
              model: Brand,
            },
          },
        },
      });

      productList = {
        ...productList,
        phone: userData.phone,
        userAdress: [
          userData?.dataValues?.adress,
          userData?.dataValues?.zipCode,
          userData?.dataValues?.city,
        ],
      };

      const checkout = await this.paymentService.createPaymentMercadoPago(
        productList
      );

      // return res.redirect(checkout.init_point);
      //si es exitoso los llevamos a la url de Mercado Pago
      return res.json({ url: checkout.init_point, data: checkout });
      // o si queres devolver la url al front
    } catch (err) {
      // si falla devolvemos un status 500
      return res.status(500).json({
        error: true,
        msg: "Hubo un error con Mercado Pago",
      });
    }
  }

  webhook(req, res) {
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        res.end("ok");
      });
    }
    return res.status(200);
  }
}

module.exports = PaymentController;
