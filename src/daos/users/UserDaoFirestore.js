import FirestoreContainer from "../../containers/FirebaseContainer.js";

class UserDaoFirestore extends FirestoreContainer {
    constructor() {
        super('users')
    }
}

export default UserDaoFirestore;