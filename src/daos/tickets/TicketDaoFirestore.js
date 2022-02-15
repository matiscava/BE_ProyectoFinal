import FirestoreContainer from "../../containers/FirebaseContainer";

class TicketsDaoFirestore extends FirestoreContainer {
    constructor() {
        super('tickets')
    }
}

export default TicketsDaoFirestore;