
import FileContainer from "../../containers/FileContainer";

class ProductDaoFile extends FileContainer {
 constructor () {
     super('/db/fs/productos.json')
 }
};

export default ProductDaoFile;