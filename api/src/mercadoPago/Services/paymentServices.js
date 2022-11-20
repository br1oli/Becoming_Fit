const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "TEST-8470830077004229-111616-f81bbd7f83d000610e08856a0bf6617b-229244888",
        // el access_token de MP
      },
    };
    // declaramos de la siguiente manera el token
    // para que sea más fácil cambiarlo dependiendo del ambiente
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
    // declaramos la url en el constructor para poder accederla a lo largo de toda la class
  }

  async createPaymentMercadoPago(data) {
    // recibimos las props que le mandamos desde el PaymentController
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;
    // url a la que vamos a hacer los requests

    const items = [data];
    console.log(items);

    const preferences = {
      // declaramos las preferencias de pago
      items,
      // el array de objetos, items que declaramos más arriba
      external_reference: "referencia del negocio",
      // referencia para identificar la preferencia, puede ser practicamente cualquier valor
      payer: {
        // información del comprador, si estan en producción tienen que //traerlos del request
        //(al igual que hicimos con el precio del item)
        name: "Lalo",
        surname: "Landa",
        email: "test_user_20859242@testuser.com",
        // si estan en sandbox, aca tienen que poner el email de SU usuario de prueba
        phone: {
          area_code: "11",
          number: "22223333",
        },
        address: {
          zip_code: "1111",
          street_name: "False",
          street_number: "123",
        },
      },
      payment_methods: {
        // declaramos el método de pago y sus restricciones
        excluded_payment_methods: [
          // aca podemos excluir metodos de pagos, tengan en cuenta que es un array de objetos
          {
            id: "amex",
          },
        ],
        excluded_payment_types: [{ id: "atm" }],
        // aca podemos excluir TIPOS de pagos, es un array de objetos
        installments: 6,
        // limite superior de cantidad de cuotas permitidas
        default_installments: 6,
        // la cantidad de cuotas que van a aparecer por defecto
      },
      back_urls: {
        // declaramos las urls de redireccionamiento
        success: "https://www.success.com",
        // url que va a redireccionar si sale todo bien
        pending: "https://www.pending.com",
        // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
        failure: "https://www.failure.com",
        // url a la que va a redireccionar si falla el pago
      },
      notification_url: "https://mercadopago-checkout.herokuapp.com/webhook",
      // declaramos nuestra url donde recibiremos las notificaciones
      auto_return: "approved",
      // si la compra es exitosa automaticamente redirige a "success" de back_urls
    };

    try {
      const request = await axios.post(url, preferences, {
        // hacemos el POST a la url que declaramos arriba, con las preferencias
        headers: {
          // y el header, que contiene content-Type
          "Content-Type": "application/json",
        },
      });

      return request.data;
      // devolvemos la data que devuelve el POST
    } catch (e) {
      console.log(e);
      // mostramos error en caso de que falle el POST
    }
  }
}

module.exports = PaymentService;
