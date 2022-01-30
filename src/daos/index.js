const ProductDaoMySQL = require('./products/ProductDaoMySQL');
const ProductDaoMongo = require('./products/ProductDaoMongo');
const ProductDaoMemory = require('./products/ProductDaoMemory');
const ProductDaoSqlite = require('./products/ProductDaoSqlite.js');
const ProductDaoFirestore = require('./products/ProductDaoFirestore');
const ProductDaoFile = require('./products/ProductDaoFile');

const CartDaoMySQL = require('./carts/CartDaoMySQL');
const CartDaoMongo = require('./carts/CartDaoMongo');
const CartDaoMemory = require('./carts/CartDaoMemory');
const CartDaoSqlite = require('./carts/CartDaoSqlite.js');
const CartDaoFirestore = require('./carts/CartDaoFirestore');
const CartDaoFile = require('./carts/CartDaoFile');

const daos = {};
// si setamos mongo vamos a exportar los daos de mongo
if (process.env.PERS === 'mongodb') {
  daos['productDao'] = new ProductDaoMongo;
  daos['cartDao'] = new CartDaoMongo;
}

// si setamos memoria vamos a exportar los daos de memoria
if (process.env.PERS === 'memory') {
  daos['productDao'] = ProductDaoMemory;
  daos['cartDao'] = CartDaoMemory;
}

// si setamos firestore vamos a exportar los daos de firestore
if (process.env.PERS === 'firestore') {
  daos['productDao'] = ProductDaoFirestore;
  daos['cartDao'] = CartDaoFirestore;
}
// si setamos firestore vamos a exportar los daos de firestore
if (process.env.PERS === 'sqlite') {
  daos['productDao'] = ProductDaoSqlite;
  daos['cartDao'] = CartDaoSqlite;
}
// si setamos firestore vamos a exportar los daos de firestore
if (process.env.PERS === 'mysql') {
  daos['productDao'] = ProductDaoMySQL;
  daos['cartDao'] = CartDaoMySQL;
}
// si setamos archivo vamos a exportar los daos de archivo
if (process.env.PERS === 'json') {
  daos['productDao'] = ProductDaoFile;
  daos['cartDao'] = CartDaoFile;
}
console.log(`Se ha conectado a ${process.env.PERS} en modo ${process.env.MODO}`);

module.exports = daos;