const SqliteContainer = require("../../containers/SqliteContainer");
const options = require('../../config');
const knex = require('knex')(options.sqlite);

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

module.exports = TicketsDaoSqlite;
