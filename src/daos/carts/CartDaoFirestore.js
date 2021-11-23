const FirestoreContainer = require("../../containers/FirebaseContainer");

class ProductDaoFirestore extends FirestoreContainer {
    constructor() {
        super('carts')
    }
}

module.exports = ProductDaoFirestore;