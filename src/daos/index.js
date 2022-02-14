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

  static async getPersistenceMethod(pers) {

    switch (pers) {
      case 'json':
        const { default: ProductDaoFile} = await import('./products/ProductDaoFile');
        const { default: CartDaoFile} = await import('./carts/CartDaoFile');
        const { default: UserDaoFile} = await import('./users/UserDaoFile');
        const { default: TicketsDaoFile} = await import('./tickets/TicketDaoFile');

        return {
          productDao : new ProductDaoFile(),
          cartDao : new CartDaoFile(),
          userDao : new UserDaoFile(),
          ticketDao : new TicketsDaoFile()
        }
      case 'firestore' :
        const { default: ProductDaoFirestore } = await import('./products/ProductDaoFirestore');
        const { default: CartDaoFirestore } = await import('./carts/CartDaoFirestore');
        const { default: UserDaoFirestore } = await import('./users/UserDaoFirestore');
        const { default: TicketsDaoFirestore } = await import('./tickets/ticketDaoFirestore');

        return {
          productDao : new ProductDaoFirestore(),
          cartDao : new CartDaoFirestore(),
          userDao : new UserDaoFirestore(),
          ticketDao : new TicketsDaoFirestore()
        }
        case 'mongodb':
          const { default: ProductDaoMongo } = await import('./products/ProductDaoMongo');
          const { default: CartDaoMongo } = await import('./carts/CartDaoMongo');
          const { default: UserDaoMongo } = await import('./users/UserDaoMongo');
          const { default: TicketsDaoMongo } = await import('./tickets/TicketDaoMongo');
  
          return {
            productDao : new ProductDaoMongo(),
            cartDao : new CartDaoMongo(),
            userDao : new UserDaoMongo(),
            ticketDao : new TicketsDaoMongo()
          }
        case 'mysql':
          const { default: ProductDaoMySQL} = await import('./products/ProductDaoMySQL');
          const { default: CartDaoMySQL} = await import('./carts/CartDaoMySQL');
          const { default: UserDaoMySQL} = await import('./users/UserDaoMySQL');
          const { default: TicketsDaoMySQL} = await import('./tickets/TicketDaoMySQL');
  
          return {
            productDao : new ProductDaoMySQL(),
            cartDao : new CartDaoMySQL(),
            userDao : new UserDaoMySQL(),
            ticketDao : new TicketsDaoMySQL()
          }
        case 'sqlite':
          const { default: ProductDaoSqlite } = await import('./products/ProductDaoSqlite');
          const { default: CartDaoSqlite } = await import('./carts/CartDaoSqlite');
          const { default: UserDaoSqlite } = await import('./users/UserDaoSqlite');
          const { default: TicketsDaoSqlite } = await import('./tickets/TicketDaoSqlite');
  
          return {
            productDao : new ProductDaoSqlite(),
            cartDao : new CartDaoSqlite(),
            userDao : new UserDaoSqlite(),
            ticketDao : new TicketsDaoSqlite()
          }
        default: 
          const {default: ProductDaoMemory} = await import('./products/ProductDaoMemory');
          const {default: CartDaoMemory} = await import('./carts/CartDaoMemory');
          const {default: UserDaoMemory} = await import('./users/UserDaoMemory');
          const {default: TicketsDaoMemory} = await import('./tickets/TicketDaoMemory');

          return {
            productDao : new ProductDaoMemory(),
            cartDao : new CartDaoMemory(),
            userDao : new UserDaoMemory(),
            ticketDao : new TicketsDaoMemory()
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