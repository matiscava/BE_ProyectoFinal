import ProductDaoFile from './products/ProductDaoFile.js';
import CartDaoFile from './carts/CartDaoFile.js';
import UserDaoFile from './users/UserDaoFile.js';
import TicketsDaoFile from './tickets/TicketDaoFile.js';

// import ProductDaoFirestore from './products/ProductDaoFirestore.js';
// import CartDaoFirestore from './carts/CartDaoFirestore.js';
// import UserDaoFirestore from './users/UserDaoFirestore.js';
// import TicketsDaoFirestore from './tickets/TicketDaoFirestore.js';

import ProductDaoMongo from './products/ProductDaoMongo.js';
import CartDaoMongo from './carts/CartDaoMongo.js';
import UserDaoMongo from './users/UserDaoMongo.js';
import TicketsDaoMongo from './tickets/TicketDaoMongo.js';

import ProductDaoMySQL from './products/ProductDaoMySQL.js';
import CartDaoMySQL from './carts/CartDaoMySQL.js';
import UserDaoMySQL from './users/UserDaoMySQL.js';
import TicketsDaoMySQL from './tickets/TicketDaoMySQL.js';

import ProductDaoSqlite from './products/ProductDaoSqlite.js';
import CartDaoSqlite from './carts/CartDaoSqlite.js';
import UserDaoSqlite from './users/UserDaoSqlite.js';
import TicketsDaoSqlite from './tickets/TicketDaoSqlite.js';

import ProductDaoMemory from './products/ProductDaoMemory.js';
import CartDaoMemory from './carts/CartDaoMemory.js';
import UserDaoMemory from './users/UserDaoMemory.js';
import TicketsDaoMemory from './tickets/TicketDaoMemory.js';
class PersistenceFactory {
  constructor(pers){
    this.daos = {}
    this.getPersistenceMethod(pers)
  }
  async getPersistenceMethod(pers) {
    if(pers){
      
      if(pers ==='json'){
        this.daos['productsDao'] = new ProductDaoFile;
        this.daos['cartsDao'] = new CartDaoFile;
        this.daos['usersDao'] = new UserDaoFile;
        this.daos['ticketsDao'] = new TicketsDaoFile;
      }
      
      // if(pers ==='firestore'){
      //   this.daos['productsDao'] = new ProductDaoFirestore;
      //   this.daos['cartsDao'] = new CartDaoFirestore;
      //   this.daos['usersDao'] = new UserDaoFirestore;
      //   this.daos['ticketsDao'] = new TicketsDaoFirestore;
      // }
  
      if(pers ==='mongodb'){
        this.daos['productsDao'] = new ProductDaoMongo();
        this.daos['cartsDao'] = new CartDaoMongo();
        this.daos['usersDao'] = new UserDaoMongo();
        this.daos['ticketsDao'] = new TicketsDaoMongo();
      }
  
      if(pers ==='mysql'){
        this.daos['productsDao'] = new ProductDaoMySQL;
        this.daos['cartsDao'] = new CartDaoMySQL;
        this.daos['usersDao'] = new UserDaoMySQL;
        this.daos['ticketsDao'] = new TicketsDaoMySQL;
      }
  
      if(pers ==='sqlite'){
        this.daos['productsDao'] = new ProductDaoSqlite;
        this.daos['cartsDao'] = new CartDaoSqlite;
        this.daos['usersDao'] = new UserDaoSqlite;
        this.daos['ticketsDao'] = new TicketsDaoSqlite;
      }

    } else if (!pers || pers === 'memory'){
      this.daos['productsDao'] = new ProductDaoMemory;
      this.daos['cartsDao'] = new CartDaoMemory;
      this.daos['usersDao'] = new UserDaoMemory;
      this.daos['ticketsDao'] = new TicketsDaoMemory;    
    }

    // switch (pers) {
    //   case 'json':
    //     console.log('dentro del metodo', ProductDaoFile);

    //     return {
    //       productDao : ProductDaoFile,
    //       cartDao : CartDaoFile,
    //       userDao : UserDaoFile,
    //       ticketDao : TicketsDaoFile
    //     }
    //   case 'firestore' :
    //     const ProductDaoFirestore = await import('./products/ProductDaoFirestore.js');
    //     const CartDaoFirestore = await import('./carts/CartDaoFirestore.js');
    //     const UserDaoFirestore = await import('./users/UserDaoFirestore.js');
    //     const TicketsDaoFirestore = await import('./tickets/ticketDaoFirestore.js');

    //     return {
    //       productDao : ProductDaoFirestore,
    //       cartDao : CartDaoFirestore,
    //       userDao : UserDaoFirestore,
    //       ticketDao : TicketsDaoFirestore
    //     }
    //     case 'mongodb':
    //       const ProductDaoMongo = await import('./products/ProductDaoMongo.js');
    //       const CartDaoMongo = await import('./carts/CartDaoMongo.js');
    //       const UserDaoMongo = await import('./users/UserDaoMongo.js');
    //       const TicketsDaoMongo = await import('./tickets/TicketDaoMongo.js');
  
    //       return {
    //         productDao : ProductDaoMongo,
    //         cartDao : CartDaoMongo,
    //         userDao : UserDaoMongo,
    //         ticketDao : TicketsDaoMongo
    //       }
    //     case 'mysql':
    //       const ProductDaoMySQL = await import('./products/ProductDaoMySQL.js');
    //       const CartDaoMySQL = await import('./carts/CartDaoMySQL.js');
    //       const UserDaoMySQL = await import('./users/UserDaoMySQL.js');
    //       const TicketsDaoMySQL = await import('./tickets/TicketDaoMySQL.js');
  
    //       return {
    //         productDao : ProductDaoMySQL,
    //         cartDao : CartDaoMySQL,
    //         userDao : UserDaoMySQL,
    //         ticketDao : TicketsDaoMySQL
    //       }
    //     case 'sqlite':

    //       const ProductDaoSqlite = await import('./products/ProductDaoSqlite.js');
    //       const CartDaoSqlite = await import('./carts/CartDaoSqlite.js');
    //       const UserDaoSqlite = await import('./users/UserDaoSqlite.js');
    //       const TicketsDaoSqlite = await import('./tickets/TicketDaoSqlite.js');
  
    //       return {
    //         productDao : ProductDaoSqlite,
    //         cartDao : CartDaoSqlite,
    //         userDao : UserDaoSqlite,
    //         ticketDao : TicketsDaoSqlite
    //       }
    //     default: 

    //       const ProductDaoMemory = await import('./products/ProductDaoMemory.js');
    //       const CartDaoMemory = await import('./carts/CartDaoMemory.js');
    //       const UserDaoMemory = await import('./users/UserDaoMemory.js');
    //       const TicketsDaoMemory = await import('./tickets/TicketDaoMemory.js');

    //       return {
    //         productDao : ProductDaoMemory,
    //         cartDao : CartDaoMemory,
    //         userDao : UserDaoMemory,
    //         ticketDao : TicketsDaoMemory
    //       }
    // }
  }

}

export default PersistenceFactory
