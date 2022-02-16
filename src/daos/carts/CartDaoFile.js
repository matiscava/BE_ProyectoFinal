
import FileContainer from "../../containers/FileContainer.js";

class CartDaoFile extends FileContainer {
 constructor () {
     super('/db/fs/carritos.json')
 }
};

export default CartDaoFile;
