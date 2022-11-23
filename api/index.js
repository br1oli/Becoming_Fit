const { conn } = require("./src/db.js");
const server = require("./src/app.js");
const preChargeProducts = require("./src/helpers/preChargeProducts");
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await preChargeProducts();
  server.listen(process.env.PORT, () => {
    console.log (`%s listening at ${PORT}`); // eslint-disable-line no-console
    }); 
});
