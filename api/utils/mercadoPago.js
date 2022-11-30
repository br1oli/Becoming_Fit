const mercadoPago = require("mercadopago");
require("dotenv").config();
//crea un objeto preferencia

mercadoPago.configure({
    access_token: process.env.ACCESS_TOKEN,
})

module.exports = {
    mercadoPago
}