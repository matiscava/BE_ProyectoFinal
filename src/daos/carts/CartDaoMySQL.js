import MySQLContainer from "../../containers/MySQLContainer";
import options from '../../config';
import knex from 'knex'

knex(options.mysql);

class CartDaoMySQL extends MySQLContainer {
  constructor() {
    super('carts', table => { 
        table.increments('id').unique().notNullable();
        table.json('products');
        table.string('timestamp').notNullable();
    })
  }
};

export default CartDaoMySQL;