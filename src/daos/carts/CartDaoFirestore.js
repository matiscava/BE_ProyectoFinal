import FirestoreContainer from "../../containers/FirebaseContainer";

class ProductDaoFirestore extends FirestoreContainer {
    constructor() {
        super('carts')
    }
}

export default ProductDaoFirestore;