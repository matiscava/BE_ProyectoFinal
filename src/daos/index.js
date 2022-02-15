class PersistenceFactory {

  static async getPersistenceMethod(pers) {
    switch (pers) {
      case 'json':
        const { default: ProductDaoFile } = await import('./products/ProductDaoFile.js');
        const { default: CartDaoFile } = await import('./carts/CartDaoFile.js');
        const { default: UserDaoFile } = await import('./users/UserDaoFile.js');
        const { default: TicketsDaoFile } = await import('./tickets/TicketDaoFile.js');

        return daos = {
          productDao : new ProductDaoFile(),
          cartDao : new CartDaoFile(),
          userDao : new UserDaoFile(),
          ticketDao : new TicketsDaoFile()
        }
      case 'firestore' :
        const { default: ProductDaoFirestore } = await import('./products/ProductDaoFirestore.js');
        const { default: CartDaoFirestore } = await import('./carts/CartDaoFirestore.js');
        const { default: UserDaoFirestore } = await import('./users/UserDaoFirestore.js');
        const { default: TicketsDaoFirestore } = await import('./tickets/ticketDaoFirestore.js');

        return daos = {
          productDao : new ProductDaoFirestore(),
          cartDao : new CartDaoFirestore(),
          userDao : new UserDaoFirestore(),
          ticketDao : new TicketsDaoFirestore()
        }
        case 'mongodb':
          const { default: ProductDaoMongo } = await import('./products/ProductDaoMongo.js');
          const { default: CartDaoMongo } = await import('./carts/CartDaoMongo.js');
          const { default: UserDaoMongo } = await import('./users/UserDaoMongo.js');
          const { default: TicketsDaoMongo } = await import('./tickets/TicketDaoMongo.js');
  
          return daos = {
            productDao : new ProductDaoMongo(),
            cartDao : new CartDaoMongo(),
            userDao : new UserDaoMongo(),
            ticketDao : new TicketsDaoMongo()
          }
        case 'mysql':
          const { default: ProductDaoMySQL } = await import('./products/ProductDaoMySQL.js');
          const { default: CartDaoMySQL } = await import('./carts/CartDaoMySQL.js');
          const { default: UserDaoMySQL } = await import('./users/UserDaoMySQL.js');
          const { default: TicketsDaoMySQL } = await import('./tickets/TicketDaoMySQL.js');
  
          return daos = {
            productDao : new ProductDaoMySQL(),
            cartDao : new CartDaoMySQL(),
            userDao : new UserDaoMySQL(),
            ticketDao : new TicketsDaoMySQL()
          }
        case 'sqlite':

          const { default: ProductDaoSqlite } = await import('./products/ProductDaoSqlite.js');
          const { default: CartDaoSqlite } = await import('./carts/CartDaoSqlite.js');
          const { default: UserDaoSqlite } = await import('./users/UserDaoSqlite.js');
          const { default: TicketsDaoSqlite } = await import('./tickets/TicketDaoSqlite.js');
  
          return daos = {
            productDao : new ProductDaoSqlite(),
            cartDao : new CartDaoSqlite(),
            userDao : new UserDaoSqlite(),
            ticketDao : new TicketsDaoSqlite()
          }
        default: 

          const { default: ProductDaoMemory } = await import('./products/ProductDaoMemory.js');
          const { default: CartDaoMemory } = await import('./carts/CartDaoMemory.js');
          const { default: UserDaoMemory } = await import('./users/UserDaoMemory.js');
          const { default: TicketsDaoMemory } = await import('./tickets/TicketDaoMemory.js');

          return daos = {
            productDao : new ProductDaoMemory(),
            cartDao : new CartDaoMemory(),
            userDao : new UserDaoMemory(),
            ticketDao : new TicketsDaoMemory()
          }
    }
  }

}

export default PersistenceFactory
