import SqliteContainer from "../../containers/SqliteContainer";
import options from '../../config';
import knex from 'knex'

knex(options.sqlite);

class ProductDaoSqlite extends SqliteContainer {
  constructor() {
    super('products', table => { 
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

export default ProductDaoSqlite;
