const MySQLContainer = require("../../containers/MySQLContainer");
const options = require('../../../config');
const knex = require('knex')(options.mysql);

class CartDaoMySQL extends MySQLContainer {
  constructor() {
    super('carts', table => { 
        table.increments('id').unique().notNullable();
        table.json('products');
        table.string('timestamp').notNullable();
    })
  }
};

module.exports = CartDaoMySQL;