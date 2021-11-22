
const FileContainer = require("../../containers/FileContainer");

class ProductDaoFile extends FileContainer {
 constructor () {
     super('/db/fs/productos.json')
 }
};

module.exports = ProductDaoFile;