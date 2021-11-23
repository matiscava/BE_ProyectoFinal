const FirestoreContainer = require("../../containers/FirebaseContainer");

class ProductDaoFirestore extends FirestoreContainer {
    constructor() {
        super('products')
    }
}

module.exports = ProductDaoFirestore;