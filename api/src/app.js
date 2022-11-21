const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const usersRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/products.routes");
const detailRoute = require("./routes/details.routes");
const categoriesRoutes = require("./routes/categories.routes");
const cartRoutes = require("./routes/cart.routes");

// const PaymentController = require("./mercadoPago/Controllers/paymentController");
// const PaymentService = require("./mercadoPago/Services/paymentServices");
// const PaymentInstance = new PaymentController(new PaymentService());

require("./db.js");

const server = express();
const cors = require("cors");

server.name = "API";

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// route management:
server.use(usersRoutes);
server.use(productRoutes);
server.use(detailRoute);
server.use(categoriesRoutes);
server.use(cartRoutes);

server.get("/payment/new", (req, res) =>
  PaymentInstance.getMercadoPagoLink(req, res)
);

server.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
