
const FileContainer = require("../../containers/FileContainer");

class CartDaoFile extends FileContainer {
 constructor () {
     super('/db/fs/carritos.json')
 }
};

module.exports = CartDaoFile;
