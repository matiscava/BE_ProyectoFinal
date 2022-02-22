import mongoose from 'mongoose';
import options from '../config.js';
import logger from './../logger/index.js';
import { asPOJO , renameField , removeField } from '../utils/objectsUtils.js';
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
class MongoContainer {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
    this.init();
  }
  
  async init() {
    try{
      if (!this.conexion) {
        this.conexion = await mongoose.connect(options.mongodb.cnxStr, options.mongodb.options);
      }
    }
    catch (err)
    {
      logger.error('Error:',err);
    }
  }
  
  async getAll() {
    try {
      let documents = await this.collection.find({},{__v:0}).lean();
      documents = documents.map(asPOJO);
      documents = documents.map( doc => renameField(doc, '_id' , 'id'))
      return documents;
    } catch (error) {
      logger.error('Error:', error);
    }
  }

  async getById(id) {
    try {
      const objID = new ObjectId(id)
      const documents = await this.collection.find({ '_id': objID },{__v:0})
      if (documents.length === 0) {
        return null;
      } else {
        const result = renameField(asPOJO(documents[0]), '_id', 'id')  
        return result;
      }
    } catch (error) {
      logger.error('Error:', error);
    }
  }

  async createProduct(producto) {
    try {
        const productsList = await this.getAll();
        const fecha = new Date().toLocaleString();
        let nextID = 1;
        let agregarData;
        if(productsList.length===0){
            agregarData={...producto,code:nextID,timestamp:fecha}
        }else{
            for(let i=0;i<productsList.length;i++){
                while( productsList[i].code >= nextID){
                    nextID++;
                }
            }
            agregarData={...producto,code:nextID,timestamp:fecha}
        }

      const document = await new this.collection(agregarData);
      const response = await document.save()

      logger.info('create new product: ', {response});
      return document._id; 
    } catch (error) {
      logger.error(error); throw error;
    }
  }
  async deleteById(id) {
    try {
      const objID = new ObjectId(id)
      const response = await this.collection.deleteOne({ _id: objID });
      logger.warn('deleteById: ', {response});
    }catch (error) {
      logger.error('Error:', error);
    };
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
      logger.warn('deleteAll: ');
    } catch (error) {
      logger.error('Error:', error);
    };
  }
  async changeProduct(id, element) {
    try{

      const fecha = new Date().toLocaleString();
      const objID = new ObjectId(id)
      const updateValues = {...element,timestamp: fecha}
      console.log('update element',updateValues);


      const newValues = { $set: updateValues };
  
      const cambio = await this.collection.updateOne({ _id: objID }, newValues)
      console.log('update cambio', cambio);
      // if ( cambio === undefined )
      // if (n == 0 || nModified == 0) {
        
      //   logger.error(`Elemento con el id: '${id}' no fue encontrado`);
      //   return null;
      // }
  
      const elementUpdated = await this.getById(id);
  
      return elementUpdated;

    } catch(err) {
      console.error('Error: ',err);
    }
  }
  
  async newCarrito(){
    try{
        const fecha = new Date().toLocaleString();
        let carritoNuevo={timestamp: fecha, products:[] };
        const document = await new this.collection(carritoNuevo);
        const response = await document.save()
        logger.info('create new cart: ', {response});
        return document._id; 
    } catch (error) {
        logger.error('Error: ', error);
        throw error;
    }
  }
  async agregarProductos(carritoId,productos){
    try {
      const prod = productos;
      // logger.info('produto',prod);
      const fecha = new Date().toLocaleString();
      const documents = await this.collection.updateOne({ _id: carritoId },{
        $set:{products:prod,timestamp: fecha}
      })
      // logger.info('document', await this.getCarrito(carritoId));
    } catch (error) {
      logger.error('Error: ', error);
      throw error;
    }
  }

  async getCarrito(carritoId){
    try{
      const documents = await this.collection.find({ _id: carritoId },{__v:0})
        return documents;
    } catch (error) {
        logger.error('Error: ', error);
        throw error;
    }
  }
  async vaciarCarrito(carritoId){
    try{
      const fecha = new Date().toLocaleString();

      this.collection.updateOne({ _id: carritoId },{$set: {products:[]}});
      this.collection.updateOne({ _id: carritoId },{$set: {timestamp:fecha}});
    
    } catch (error) {
        logger.error('Error: ', error);
        throw error;
    }
  }
  async borrarItem(carritoId, productoId){
    try{
      this.collection.findOneAndDelete({ _id: carritoId },{products:[{_id:productoId}]});
      this.collection.updateOne({ _id: carritoId },{$set: {timestamp:fecha}});
      return true
    } catch (error) {
        logger.error('Error: ', error);
        throw error;
    }
  }
  async createUser (user) {
    try{
      const document = await this.collection(user);
      const response = await document.save()
      logger.info('Cliente creado', response);
      return document._id;
    }catch(err){
      logger.error('Error: ', error);
    }
  }
  async findUser (email) {
    try{
      const user = await this.collection.findOne({email: email}, {__v: 0});
      return user;
    }catch(err){logger.error(`Error: ${err}`)}
  }

  async createTicket (ticketCompra) {
    try{
      const newTicket = {
        username: ticketCompra.username,
        name:ticketCompra.name,
        lastname:ticketCompra.lastname,
        email:ticketCompra.email,
        photo:ticketCompra.photo,
        userId:ticketCompra.id,
        cart:ticketCompra.cart,
        phone:ticketCompra.phone
      }
      logger.info(newTicket);
      const document = await new this.collection(newTicket);
      const response = await document.save()
      logger.info('Ticket creado', response);
      return document._id;
    }catch(err){logger.error(`Error: ${err}`)}
  }
}

export default MongoContainer;