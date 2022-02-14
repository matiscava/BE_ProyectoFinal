const FirestoreContainer = require("../../containers/FirebaseContainer");

class TicketsDaoFirestore extends FirestoreContainer {
    constructor() {
        super('tickets')
    }
}

module.exports = TicketsDaoFirestore;