import FirestoreContainer from "../../containers/FirebaseContainer.js";

class ProductDaoFirestore extends FirestoreContainer {
    constructor() {
        super('products')
    }
}

export default ProductDaoFirestore;