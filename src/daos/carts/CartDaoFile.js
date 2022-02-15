
import FileContainer from "../../containers/FileContainer";

class CartDaoFile extends FileContainer {
 constructor () {
     super('/db/fs/carritos.json')
 }
};

export default CartDaoFile;
