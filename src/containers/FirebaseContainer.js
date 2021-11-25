const admin = require('firebase-admin');
const options = require('../../config');
const serviceAccount = require('../../db/firebase/proyectofinalbe-b686f-firebase-adminsdk-mnu25-7fa3d70aa9.json');

class FirestoreContainer {
    constructor(collection) {
        this.init();
        const db = admin.firestore();
        this.query = db.collection(collection);
    }
    async init () {
        try{
            if(!admin.apps.length && !this.conexion){
                this.conexion = admin.initializeApp({
                    credential: admin.credential.cert(options.firestore)
                    // databaseURL: 'https://proyectofinalbe-b686f.firebase.com'
                });
            };
        } catch (error) {
            console.error(`error`, error);
            throw new Error("Ocurrio un error al conectar:", error);
        }

    }
    async getAll() {
        try{
            const documents = await this.query.get();
            const response = [] 
            
            documents.docs.forEach((doc) => {
                response.push({id:doc.id, ...doc.data()});
            })
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async save(producto) {
        try{
            const productsList = await this.getAll();
            const fecha = new Date().toLocaleString();
            let nextCode = 1;
            let agregarData;
            if(productsList.length===0){
                agregarData={...producto,code:nextCode,timestamp:fecha}
            }else{
                for(let i=0; i<productsList.length;i++){
                    while(productsList[i].code >= nextCode){
                        nextCode++;
                    }
                }
                agregarData={...producto,code:nextCode,timestamp:fecha}
            }
            const response = await this.query.add(agregarData);
    
            console.log('create new product: ', response.id);
        }catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async getById(id){
        try{
            const document = await this.query.doc(id).get();
            if(document.empty) {
                console.log('No matching documents');
                return null;
            } else {
                return {...document.data(),id:document.id};
            }
        }catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async deleteById(id) {
        try{
            const response = await this.query.doc(id).delete();
            console.log('deleteById: ', {response});
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async deleteAll() {
        try{
            const response = await this.query.delete();
            console.log('deleteById: ', {response});
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async update(id,element) {
        try{
            const fecha = new Date().toLocaleString();
            const document = this.query.doc(id).update({...element,timestamp:fecha});
            return document;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    //CARRITO
    async newCarrito() {
        try{
            const fecha = new Date().toLocaleString();
            let carritoNuevo={timestamp: fecha, products:[] };
            const response = await this.query.add(carritoNuevo);
            console.log( 'New Cart Created id: ', response.id);
            return response.id;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async getCarrito(carritoId){
        try{
            const document = await this.query.doc(carritoId).get();
            if(document.empty) {
                console.log('No matching documents');
                return null;
            } else {
                return {...document.data(),id:document.id};
            }
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
      }
    async agregarProductos(carritoId, products) {
        try{
            const fecha = new Date().toLocaleString();
            const carritoElegido = await this.getById(carritoId);
            const productsOriginal = carritoElegido.products;
            let carritoModificado;
            if ( productsOriginal.length === 0 ){
                carritoModificado = await this.query.doc(carritoId).update({timestamp:fecha,products: products})
            } else {
                products.forEach( prod => {
                    const productoRepetido = carritoElegido.products.find((producto) => producto.id === prod.id)
                    if (productoRepetido){
                        prod.quantity+=productoRepetido.quantity;
                        prod.timestamp=fecha;
                    }else{
                        console.log('producto no existe');
                    }
                });
                carritoModificado = await this.query.doc(carritoId).update({timestamp:fecha,products: products})
            }
        } catch (error) {
            console.error('Error: ', error);
            throw error;
          }
    }
    async vaciarCarrito(carritoId) {
        try{
            const fecha = new Date().toLocaleString();
            await this.query.doc(carritoId).update({timestamp:fecha,products: []});
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async borrarItem(carritoId, productoId) {
        try{
            const fecha = new Date().toLocaleString();
            const carritoElegido = await this.getById(carritoId);
            const productsOriginal = carritoElegido.products;
            const productIndex = productsOriginal.findIndex((prod) => prod.id === productoId);
            productsOriginal.splice(productIndex,1);

            await this.query.doc(carritoId).update({timestamp:fecha,products: productsOriginal});

        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
}

module.exports = FirestoreContainer;
