// const ProductDaoMySQL = require('./products/ProductDaoMySQL');
// const ProductDaoMongo = require('./products/ProductDaoMongo');
// const ProductDaoMemory = require('./products/ProductDaoMemory');
// const ProductDaoSqlite = require('./products/ProductDaoSqlite.js');
// const ProductDaoFirestore = require('./products/ProductDaoFirestore');

// const CartDaoMySQL = require('./carts/CartDaoMySQL');
// const CartDaoMongo = require('./carts/CartDaoMongo');
// const CartDaoMemory = require('./carts/CartDaoMemory');
// const CartDaoSqlite = require('./carts/CartDaoSqlite.js');
// const CartDaoFirestore = require('./carts/CartDaoFirestore');

// const UserDaoMongo = require('./users/UserDaoMongo')



// const TicketsDaoMongo = require('./tickets/TicketDaoMongo')


const logger = require('./../logger')
const config = require('../config');

const daos = {};

class PersistenceFactory {

  static getPersistenceMethod(pers) {

    switch (pers) {
      case 'json':
        const ProductDaoFile = require('./products/ProductDaoFile');
        const CartDaoFile = require('./carts/CartDaoFile');
        const UserDaoFile = require('./users/UserDaoFile');
        const TicketsDaoFile = require('./tickets/TicketDaoFile');

        return {
          productDao : new ProductDaoFile,
          cartDao : new CartDaoFile,
          userDao : new UserDaoFile,
          ticketDao : new TicketsDaoFile
        }
      case 'firestore' :
        const ProductDaoFirestore = require('./products/ProductDaoFirestore');
        const CartDaoFirestore = require('./carts/CartDaoFirestore');
        const UserDaoFirestore = require('./users/UserDaoFirestore');
        const TicketsDaoFirestore = require('./tickets/ticketDaoFirestore');

        return {
          productDao : new ProductDaoFirestore,
          cartDao : new CartDaoFirestore,
          userDao : new UserDaoFirestore,
          ticketDao : new TicketsDaoFirestore
        }
        case 'mongodb':
          const ProductDaoMongo = require('./products/ProductDaoMongo');
          const CartDaoMongo = require('./carts/CartDaoMongo');
          const UserDaoMongo = require('./users/UserDaoMongo');
          const TicketsDaoMongo = require('./tickets/TicketDaoMongo');
  
          return {
            productDao : new ProductDaoMongo,
            cartDao : new CartDaoMongo,
            userDao : new UserDaoMongo,
            ticketDao : new TicketsDaoMongo
          }
        case 'mysql':
          const ProductDaoMySQL = require('./products/ProductDaoMySQL');
          const CartDaoMySQL = require('./carts/CartDaoMySQL');
          const UserDaoMySQL = require('./users/UserDaoMySQL');
          const TicketsDaoMySQL = require('./tickets/TicketDaoMySQL');
  
          return {
            productDao : new ProductDaoMySQL,
            cartDao : new CartDaoMySQL,
            userDao : new UserDaoMySQL,
            ticketDao : new TicketsDaoMySQL
          }
        case 'sqlite':
          const ProductDaoSqlite = require('./products/ProductDaoSqlite');
          const CartDaoSqlite = require('./carts/CartDaoSqlite');
          const UserDaoSqlite = require('./users/UserDaoSqlite');
          const TicketsDaoSqlite = require('./tickets/TicketDaoSqlite');
  
          return {
            productDao : new ProductDaoSqlite,
            cartDao : new CartDaoSqlite,
            userDao : new UserDaoSqlite,
            ticketDao : new TicketsDaoSqlite
          }
        default: 
          const ProductDaoMemory = require('./products/ProductDaoMemory');
          const CartDaoMemory = require('./carts/CartDaoMemory');
          const UserDaoMemory = require('./users/UserDaoMemory');
          const TicketsDaoMemory = require('./tickets/TicketDaoMemory');

          return {
            productDao : new ProductDaoMemory,
            cartDao : new CartDaoMemory,
            userDao : new UserDaoMemory,
            ticketDao : new TicketsDaoMemory
          }
    }
  }

}

// si setamos mongo vamos a exportar los daos de mongo
// if (config.PERS === 'mongodb') {
//   daos['productDao'] = new ProductDaoMongo;
//   daos['cartDao'] = new CartDaoMongo;
//   daos['userDao'] = new UserDaoMongo;
//   daos['ticketDao'] = new TicketsDaoMongo;
// }

// si setamos memoria vamos a exportar los daos de memoria
// if (config.PERS === 'memory') {
//   daos['productDao'] = ProductDaoMemory;
//   daos['cartDao'] = CartDaoMemory;
// }

// si setamos firestore vamos a exportar los daos de firestore
// if (config.PERS === 'firestore') {
//   daos['productDao'] = ProductDaoFirestore;
//   daos['cartDao'] = CartDaoFirestore;
// }
// si setamos firestore vamos a exportar los daos de firestore
// if (config.PERS === 'sqlite') {
//   daos['productDao'] = ProductDaoSqlite;
//   daos['cartDao'] = CartDaoSqlite;
// }
// si setamos firestore vamos a exportar los daos de firestore
// if (config.PERS === 'mysql') {
//   daos['productDao'] = ProductDaoMySQL;
//   daos['cartDao'] = CartDaoMySQL;
// }
// si setamos archivo vamos a exportar los daos de archivo
// if (config.PERS === 'json' || !config.PERS	) {
//   daos['productDao'] = new ProductDaoFile;
//   daos['cartDao'] = new CartDaoFile;
//   daos['userDao'] = new UserDaoFile;

// }

// logger.info(`Se conecto a ${config.PERS} en modo ${config.MODE}`);

module.exports = PersistenceFactory;