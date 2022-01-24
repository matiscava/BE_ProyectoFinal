const SqliteContainer = require("../../containers/SqliteContainer");
const options = require('../../config');
const knex = require('knex')(options.sqlite);

class CartDaoSqlite extends SqliteContainer {
  constructor() {
    super('carts', table => { 
        table.increments('id').unique().notNullable();
        table.json('products');
        table.string('timestamp').notNullable();
    })
  }
};

module.exports = CartDaoSqlite;