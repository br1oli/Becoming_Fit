const { conn, Product } = require('./src/db.js');
const dataJSON = require('./src/data.json');
const server = require('./src/app.js');
// const { getProductsFromDb, saveProductsInDb } = require("./src/helpers");

async function chargeProducts() {
  try {
    const verifyDB = await Product.findAll();
    if (!verifyDB.length > 0) {
      //console.log(dataJSON, '12345');
      //      const apiJSON = JSON.parse(dataJSON);
      const apiJSON = dataJSON;

      //console.log(apiJSON);
      const apiInfo = await apiJSON.map((p) => {
        return {
          name: p.name,
          gender: p.gender,
          size: Object.values(p.size).join(' '),
          rating: p.rating,
          price: p.price,
          image: p.image,
        };
      });
      //console.log(apiInfo, 'Chau');
      await Product.bulkCreate(apiInfo, { validate: true });
    }
  } catch (e) {
    console.log(e);
  }
}

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  // const verifyDB = await getProductsFromDb();
  // if (!verifyDB.length) {
  //   await saveProductsInDb();
  // }
  await chargeProducts();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});