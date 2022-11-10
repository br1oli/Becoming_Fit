const { conn, Product } = require("./src/db.js");
const dataJSON = require("./src/data.json");
const server = require("./src/app.js");
// const { getProductsFromDb, saveProductsInDb } = require("./src/helpers");

async function chargeProducts() {
  try {
    const verifyDB = await Product.findAll();
    if (!verifyDB.length > 0) {
      //console.log(dataJSON, '12345');
      //      const apiJSON = JSON.parse(dataJSON);
      const apiJSON = dataJSON;

      //console.log(apiJSON);

      //--Mica: comenté el await por un aviso de visual 'has no effect on the type of this expresion'
      const apiInfo = /* await */ apiJSON.map((p) => {
        return {
          name: p.name,
          type: p.type,
          gender: p.gender,
          size: Object.values(p.size).join(" "),
          color: Object.values(p.color).join(", "),
          rating: p.rating,
          description: p.description,
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
  await chargeProducts();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});