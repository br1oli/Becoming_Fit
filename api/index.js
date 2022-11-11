const { conn, Product } = require("./src/db.js");
const dataJSON = require("./src/data.json");
const server = require("./src/app.js");
const preChargeProducts = require("./src/helpers/preChargeProducts");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await preChargeProducts();
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
