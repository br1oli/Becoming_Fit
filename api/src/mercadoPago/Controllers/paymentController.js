const { Cart, CartProduct, Product, Brand } = require("../../db");

class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async getMercadoPagoLink(req, res) {
    const { userEmail } = req.query;
    try {
      console.log(userEmail);
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

      const checkout = await this.paymentService.createPaymentMercadoPago(
        productList
      );

      return res.redirect(checkout.init_point);
      //si es exitoso los llevamos a la url de Mercado Pago

      //return res.json({ url: checkout.init_point });
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
        console.log(body, "webhook response");
        res.end("ok");
      });
    }
    return res.status(200);
  }
}

module.exports = PaymentController;
