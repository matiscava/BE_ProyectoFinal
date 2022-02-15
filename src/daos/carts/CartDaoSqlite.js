import SqliteContainer from "../../containers/SqliteContainer";
import options from '../../config';
import knex from 'knex'

knex(options.sqlite);

class CartDaoSqlite extends SqliteContainer {
  constructor() {
    super('carts', table => { 
        table.increments('id').unique().notNullable();
        table.json('products');
        table.string('timestamp').notNullable();
    })
  }
};

export default CartDaoSqlite;