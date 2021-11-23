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
if (process.env.storage === 'mongodb') {
  daos['productDao'] = ProductDaoMongo;
  daos['cartDao'] = CartDaoMongo;
  console.log('Se conecto a mongo');

}

// si setamos memoria vamos a exportar los daos de memoria
if (process.env.storage === 'memory') {
  daos['productDao'] = ProductDaoMemory;
  daos['cartDao'] = CartDaoMemory;
  console.log('Se conecto a la memoria');

}

// si setamos firestore vamos a exportar los daos de firestore
if (process.env.storage === 'firestore') {
  daos['productDao'] = ProductDaoFirestore;
  daos['cartDao'] = CartDaoFirestore;
  console.log('Se conecto al firestore');

}
// si setamos firestore vamos a exportar los daos de firestore
if (process.env.storage === 'sqlite') {
  daos['productDao'] = ProductDaoSqlite;
  daos['cartDao'] = CartDaoSqlite;
  console.log('Se conecto al sqlite');

}
// si setamos firestore vamos a exportar los daos de firestore
if (process.env.storage === 'mysql') {
  daos['productDao'] = ProductDaoMySQL;
  daos['cartDao'] = CartDaoMySQL;
  console.log('Se conecto al MySQL');

}
// si setamos archivo vamos a exportar los daos de archivo
if (process.env.storage === 'file') {
  daos['productDao'] = ProductDaoFile;
  daos['cartDao'] = CartDaoFile;
  console.log('Se conecto al file');

}

module.exports = daos;