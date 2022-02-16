import FirestoreContainer from "../../containers/FirebaseContainer.js";

class ProductDaoFirestore extends FirestoreContainer {
    constructor() {
        super('carts')
    }
}

export default ProductDaoFirestore;