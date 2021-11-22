const { sqlite } = require("../../../config");
const SqliteContainer = require("../../containers/SqliteContainer");



class ProductDaoSqlite extends SqliteContainer {
    constructor (){
        super(sqlite,'products')
    }
}
module.exports = ProductDaoSqlite;