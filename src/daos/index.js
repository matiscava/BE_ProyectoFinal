class PersistenceFactory {
  constructor(pers){
    this.getPersistenceMethod(pers)
  }

  async getPersistenceMethod(pers) {
    console.log('dentro del metodo', pers);
    switch (pers) {
      case 'json':
        const ProductDaoFile = await import('./products/ProductDaoFile.js');
        const CartDaoFile = await import('./carts/CartDaoFile.js');
        const UserDaoFile = await import('./users/UserDaoFile.js');
        const TicketsDaoFile = await import('./tickets/TicketDaoFile.js');
        console.log('dentro del metodo', ProductDaoFile);

        return {
          productDao : ProductDaoFile,
          cartDao : CartDaoFile,
          userDao : UserDaoFile,
          ticketDao : TicketsDaoFile
        }
      case 'firestore' :
        const ProductDaoFirestore = await import('./products/ProductDaoFirestore.js');
        const CartDaoFirestore = await import('./carts/CartDaoFirestore.js');
        const UserDaoFirestore = await import('./users/UserDaoFirestore.js');
        const TicketsDaoFirestore = await import('./tickets/ticketDaoFirestore.js');

        return {
          productDao : ProductDaoFirestore,
          cartDao : CartDaoFirestore,
          userDao : UserDaoFirestore,
          ticketDao : TicketsDaoFirestore
        }
        case 'mongodb':
          const ProductDaoMongo = await import('./products/ProductDaoMongo.js');
          const CartDaoMongo = await import('./carts/CartDaoMongo.js');
          const UserDaoMongo = await import('./users/UserDaoMongo.js');
          const TicketsDaoMongo = await import('./tickets/TicketDaoMongo.js');
  
          return {
            productDao : ProductDaoMongo,
            cartDao : CartDaoMongo,
            userDao : UserDaoMongo,
            ticketDao : TicketsDaoMongo
          }
        case 'mysql':
          const ProductDaoMySQL = await import('./products/ProductDaoMySQL.js');
          const CartDaoMySQL = await import('./carts/CartDaoMySQL.js');
          const UserDaoMySQL = await import('./users/UserDaoMySQL.js');
          const TicketsDaoMySQL = await import('./tickets/TicketDaoMySQL.js');
  
          return {
            productDao : ProductDaoMySQL,
            cartDao : CartDaoMySQL,
            userDao : UserDaoMySQL,
            ticketDao : TicketsDaoMySQL
          }
        case 'sqlite':

          const ProductDaoSqlite = await import('./products/ProductDaoSqlite.js');
          const CartDaoSqlite = await import('./carts/CartDaoSqlite.js');
          const UserDaoSqlite = await import('./users/UserDaoSqlite.js');
          const TicketsDaoSqlite = await import('./tickets/TicketDaoSqlite.js');
  
          return {
            productDao : ProductDaoSqlite,
            cartDao : CartDaoSqlite,
            userDao : UserDaoSqlite,
            ticketDao : TicketsDaoSqlite
          }
        default: 

          const ProductDaoMemory = await import('./products/ProductDaoMemory.js');
          const CartDaoMemory = await import('./carts/CartDaoMemory.js');
          const UserDaoMemory = await import('./users/UserDaoMemory.js');
          const TicketsDaoMemory = await import('./tickets/TicketDaoMemory.js');

          return {
            productDao : ProductDaoMemory,
            cartDao : CartDaoMemory,
            userDao : UserDaoMemory,
            ticketDao : TicketsDaoMemory
          }
    }
  }

}

export default PersistenceFactory
