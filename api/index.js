const { conn } = require("./src/db.js");
const server = require("./src/app.js");
const preChargeProducts = require("./src/helpers/preChargeProducts");
const { PGPORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  await preChargeProducts();
  server.listen(PGPORT, () => {
    console.log(`%s listening at ${PGPORT}`); // eslint-disable-line no-console
  });
});
