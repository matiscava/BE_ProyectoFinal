const FirestoreContainer = require("../../containers/FirebaseContainer");

class UserDaoFirestore extends FirestoreContainer {
    constructor() {
        super('users')
    }
}

module.exports = UserDaoFirestore;