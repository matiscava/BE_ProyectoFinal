import FirestoreContainer from "../../containers/FirebaseContainer.js";

class TicketsDaoFirestore extends FirestoreContainer {
    constructor() {
        super('tickets')
    }
}

export default TicketsDaoFirestore;