const admin = require('firebase-admin');
const options = require('../../config');
const serviceAccount = require('../../db/firebase/proyectofinalbe-b686f-firebase-adminsdk-mnu25-7fa3d70aa9.json');

class FirestoreContainer {
    constructor(collection) {
        this.init();
        const db = admin.firestore();
        this.collection = db.collection(this.collection);
    }
    async init () {
        if(!this.conexion){
            this.conexion = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: 'https://proyectofinalbe-b686f.firebase.com'
            })
        }
    }
    async getAll() {
        try{
            const documents = await this.collection.get();
            const response = [] 
            
            documents.docs.forEach((doc) => {
                response.push({id:doc.id, ...doc.data()});
            })
        } catch (error) {
            console.error('Error:', error);
          }
    }
}

module.exports = FirestoreContainer;
