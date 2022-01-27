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

const config = require('../config');

const daos = {};
// si setamos mongo vamos a exportar los daos de mongo
if (config.PERS === 'mongodb') {
  daos['productDao'] = ProductDaoMongo;
  daos['cartDao'] = CartDaoMongo;
  console.log('Se conecto a mongo');

}

// si setamos memoria vamos a exportar los daos de memoria
if (config.PERS === 'memory') {
  daos['productDao'] = ProductDaoMemory;
  daos['cartDao'] = CartDaoMemory;
  console.log('Se conecto a la memoria');

}

// si setamos firestore vamos a exportar los daos de firestore
if (config.PERS === 'firestore') {
  daos['productDao'] = ProductDaoFirestore;
  daos['cartDao'] = CartDaoFirestore;
  console.log('Se conecto al firestore');

}
// si setamos firestore vamos a exportar los daos de firestore
if (config.PERS === 'sqlite') {
  daos['productDao'] = ProductDaoSqlite;
  daos['cartDao'] = CartDaoSqlite;
  console.log('Se conecto al sqlite');

}
// si setamos firestore vamos a exportar los daos de firestore
if (config.PERS === 'mysql') {
  daos['productDao'] = ProductDaoMySQL;
  daos['cartDao'] = CartDaoMySQL;
  console.log('Se conecto al MySQL');

}
// si setamos archivo vamos a exportar los daos de archivo
if (config.PERS === 'file') {
  daos['productDao'] = ProductDaoFile;
  daos['cartDao'] = CartDaoFile;
  console.log('Se conecto al file');

}

module.exports = daos;