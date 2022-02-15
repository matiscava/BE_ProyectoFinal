import FirestoreContainer from "../../containers/FirebaseContainer";

class UserDaoFirestore extends FirestoreContainer {
    constructor() {
        super('users')
    }
}

export default UserDaoFirestore;