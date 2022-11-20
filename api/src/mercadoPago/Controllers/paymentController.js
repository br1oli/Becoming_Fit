class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  /* const data = JSON.parse(localStorage.getItem("shoppCart"));
try {
  const checkout = await this.paymentService.createPaymentMercadoPago(
    data ? data : "Error de localStorage"
  );} */

  async getMercadoPagoLink(req, res) {
    const data = req.body;
    console.log(data);
    try {
      const checkout = await this.paymentService.createPaymentMercadoPago(
        data ? data : "Error de localStorage"
      );

      /*     const { name, price, unit } = req.body;
    try {
      const checkout = await this.paymentService.createPaymentMercadoPago(
        name, // nombre del producto o servicio
        price, //precio del producto o servicio
        unit //cantidad que estamos vendiendo
      ); */

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
