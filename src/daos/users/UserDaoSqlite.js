import SqliteContainer from "../../containers/SqliteContainer";
import options from '../../config';
import knex from 'knex';
knex(options.sqlite)

class TicketsDaoSqlite extends SqliteContainer {
  constructor() {
    super('tickets', (table) => { 
        table.increments('id').unique().notNullable();
        table.string('username').notNullable();
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('photo').notNullable();
        table.integer('phone').notNullable();
        table.boolean('admin').default(false).notNullable();
    })
  }
};

export default TicketsDaoSqlite;
