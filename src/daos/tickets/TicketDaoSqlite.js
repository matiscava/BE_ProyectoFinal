import SqliteContainer from "../../containers/SqliteContainer";
import options from '../../config';
import knex from 'knex'

knex(options.sqlite);

class TicketsDaoSqlite extends SqliteContainer {
  constructor() {
    super('tickets', (table) => { 
        table.increments('id').unique().notNullable();
        table.string('username').notNullable();
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable();
        table.string('photo').notNullable();
        table.integer('phone').notNullable();
        table.string('userId').notNullable();
        table.json('cart');
    })
  }
};

export default TicketsDaoSqlite;
