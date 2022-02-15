import FirestoreContainer from "../../containers/FirebaseContainer";

class ProductDaoFirestore extends FirestoreContainer {
    constructor() {
        super('products')
    }
}

export default ProductDaoFirestore;