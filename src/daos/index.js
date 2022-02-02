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

const UserDaoMongo = require('./users/userDaoMongo')
const UserDaoFile = require('./users/userDaoFile')


const TicketsDaoMongo = require('./tickets/ticketsDaoMongo')

const logger = require('./../logger')
const config = require('../config');

const daos = {};
// si setamos mongo vamos a exportar los daos de mongo
if (config.PERS === 'mongodb') {
  daos['productDao'] = new ProductDaoMongo;
  daos['cartDao'] = new CartDaoMongo;
  daos['userDao'] = new UserDaoMongo;
  daos['ticketDao'] = new TicketsDaoMongo;
}

// si setamos memoria vamos a exportar los daos de memoria
if (config.PERS === 'memory') {
  daos['productDao'] = ProductDaoMemory;
  daos['cartDao'] = CartDaoMemory;
}

// si setamos firestore vamos a exportar los daos de firestore
if (config.PERS === 'firestore') {
  daos['productDao'] = ProductDaoFirestore;
  daos['cartDao'] = CartDaoFirestore;
}
// si setamos firestore vamos a exportar los daos de firestore
if (config.PERS === 'sqlite') {
  daos['productDao'] = ProductDaoSqlite;
  daos['cartDao'] = CartDaoSqlite;
}
// si setamos firestore vamos a exportar los daos de firestore
if (config.PERS === 'mysql') {
  daos['productDao'] = ProductDaoMySQL;
  daos['cartDao'] = CartDaoMySQL;
}
// si setamos archivo vamos a exportar los daos de archivo
if (config.PERS === 'json' || !config.PERS	) {
  daos['productDao'] = new ProductDaoFile;
  daos['cartDao'] = new CartDaoFile;
  daos['userDao'] = new UserDaoFile;

}

logger.info(`Se conecto a ${config.PERS} en modo ${config.MODE}`);

module.exports = daos;