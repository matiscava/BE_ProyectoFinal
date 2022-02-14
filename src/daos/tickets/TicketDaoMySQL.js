const MySQLContainer = require("../../containers/MySQLContainer");
const options = require('../../config');
const knex = require('knex')(options.mysql);

class TicketsDaoMySQL extends MySQLContainer {
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

module.exports = TicketsDaoMySQL;
