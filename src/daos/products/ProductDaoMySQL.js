const MySQLContainer = require("../../containers/MySQLContainer");
const options = require('../../../config');
const knex = require('knex')(options.mysql);

class ProductDaoMySQL extends MySQLContainer {
  constructor() {
    super('products', (table) => { 
        table.increments('id').unique().notNullable();
        table.string('title').notNullable();
        table.string('photo').notNullable();
        table.string('description').notNullable();
        table.integer('price').notNullable();
        table.integer('stock').notNullable();
        table.integer('code').unique().notNullable();
        table.string('timestamp').notNullable();
    })
  }
};

module.exports = ProductDaoMySQL;
