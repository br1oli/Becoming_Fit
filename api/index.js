const { conn } = require("./src/db.js");
const server = require("./src/app.js");
const getProductsFromDb = require("./src/helpers/getProducts");
const saveProducts = require("./src/helpers/saveProducts.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const verifyDB = await getProductsFromDb();
  if (!verifyDB.length) {
    await saveProducts();
  }
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
