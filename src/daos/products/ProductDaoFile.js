
const ObjetoFS = require("../../containers/FileContainer");

class ProductDaoFile extends ObjetoFS {
 constructor () {
     super('/db/fs/productos.json')
 }
};

module.exports = ProductDaoFile;