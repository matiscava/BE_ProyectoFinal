const mongoose = require('mongoose');
const options = require('../../config');

class MongoContainer {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
    this.init();
  }
  
  async init() {
    if (!this.conexion) {
      this.conexion = await mongoose.connect(options.mongodb.host, options.mongodb.options);
    }
  }
  
  async getAll() {
    try {
      const documents = await this.collection.find({})
      return documents;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async save(producto) {
    try {
        const productsList = await this.getAll();
        const fecha = new Date().toLocaleString();
        let nextID = 1;
        let agregarData;
        if(productsList.length===0){
            agregarData={...producto,codigo:nextID,timstamp:fecha}
        }else{
            for(let i=0;i<productsList;i++){
                while( productsList[i].code >= nextID){
                    nextID++;
                }
            }
            agregarData={...producto,codigo:nextID,timstamp:fecha}
        }
      const document = await this.collection.create(agregarData);
      console.log('create: ', {document});
      return document._id; 
    } catch (error) {
      console.error(error); throw error;
    }
  }
  async getById(id) {
    try {
      const documents = await this.collection.find({ _id: id })
      console.log({documents});
      if (documents.length === 0) {
        return null;
      } else {
        return documents[0];
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async deleteById(id) {
    try {
      const response = await this.collection.deleteOne({ _id: id });
      console.log('deleteById: ', {response});
    }catch (error) {
      console.error('Error:', error);
    };
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
      console.log('deleteAll: ');
    } catch (error) {
      console.error('Error:', error);
    };
  }
  async update(id, element) {
    const { n, nModified } = await this.collection.updateOne({ _id: id }, {
      $set: element
    })
    if (n == 0 || nModified == 0) {
      console.error(`Elemento con el id: '${id}' no fue encontrado`);
      return null;
    }

    const elementUpdated = await this.getById(id);

    return elementUpdated;
  }
}

module.exports = MongoContainer;