require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: PGDATABASE,
        dialect: "postgres",
        host: PGHOST,
        port: 7360,
        username: PGUSER,
        password: PGPASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/becomingfit`,
        { logging: false, native: false }
      );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  FavoritesProduct,
  Brand,
  CartProduct,
  Cart,
  Category,
  ProductInventory,
  Product,
  PurchasedProduct,
  UserProfile,
  User,
  Order,
  Review,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

//-------------------------------------Relaciones Producto Marca, Inventario, Categoria-----------------------
//Asociacion Producto:Marca
Brand.hasMany(Product /* {foreignKey: 'brandId'} */);
Product.belongsTo(Brand);
//-----------------------Relacion user,Review,Product--------------------------

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

//Asociacion Producto:Categoria
Category.hasMany(Product /* {foreignKey: 'categoryId'} */);
Product.belongsTo(Category);

//Asociacion Producto:Type
// ProductCategory.hasMany(Product /* {foreignKey: 'categoryId'} */);
// Product.belongsTo(ProductCategory);

//Asociacion Producto:ProductoInventario
Product.hasOne(ProductInventory /* { through: "Product_ProductInventory" } */);
ProductInventory.belongsTo(
  Product /* { through: "Product_ProductInventory" } */
);

//---------------------------------------------Relaciones Favorites-------------------------------------

User.hasMany(FavoritesProduct);
FavoritesProduct.belongsTo(User);

// Favorites.hasMany(FavoritesProduct);
// FavoritesProduct.belongsTo(Favorites);

Product.hasOne(FavoritesProduct);
FavoritesProduct.belongsTo(Product);

//---------------------------------------------Relaciones Cart-------------------------------------

User.hasOne(Cart /*  { through: "User_Cart" } */);
Cart.belongsTo(User /* { through: "User_Cart" } */);

Cart.hasMany(CartProduct /* { through: "Cart_CartProduct" } */);
CartProduct.belongsTo(Cart /*  { through: "Cart_CartProduct" } */);

Product.hasOne(CartProduct /* { through: "Product_CartProduct" } */);
CartProduct.belongsTo(Product /* { through: "Product_CartProduct" } */);

//---------------------------------------------Relacion usuario-Payment--------------------

// User.hasMany(PaymentMethod /* { foreignKey: "userIdPayment" } */);
// PaymentMethod.belongsTo(User);

// User.hasMany(PaymentDetail /*  { through: "User_PaymentDetail" } */);
// PaymentDetail.belongsTo(User /* { through: "User_PaymentDetail" } */);

Product.hasMany(PurchasedProduct /* { through: "Product_PurchasedProduct" } */);
PurchasedProduct.belongsTo(
  Product /* { through: "Product_PurchasedProduct" } */
);
Order.hasMany(PurchasedProduct /* { through: "Product_PurchasedProduct" } */);
PurchasedProduct.belongsTo(
  Product /* { through: "Product_PurchasedProduct" } */
);

User.hasMany(Order);
Order.belongsTo(User);

// PaymentDetail.hasOne(
//   PurchaseDetail /* {through: "PaymentDetail_PurchaseDetail"} */
// );
// PurchaseDetail.belongsTo(
//   PaymentDetail /* {through: "PaymentDetail_PurchaseDetail"} */
// );

// PurchaseDetail.hasMany(PurchasedProduct);
// PurchasedProduct.belongsTo(PurchaseDetail);

User.hasMany(PurchasedProduct);
PurchasedProduct.belongsTo(User);

// relation user-profile user-phone
User.hasOne(UserProfile);
UserProfile.belongsTo(User);

//-------------------------------------Relacion usuario-Reviews---------------------------------

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Op,
};
