import options from '../config.js';
import knex from 'knex';
import logger from './../logger/index.js'

class SqliteContainer {
  constructor(collection,table) {
    this.init(table);
    this.knex = knex(options.sqlite)
    this.collection = collection;
  }
    
  async init (table) {
    try{
      if (!this.conexion){
        this.conexion = knex.schema.createTable(this.collection,table)
      }
    }catch (error) {
      logger.error(`error`, error);
      throw new Error("Ocurrio un error al conectar:", error);
    }
  }
  async getAll() {
    try {
      const listado = []; 
      await knex.from(this.collection).select('*')
        .then((rows) => {
            rows.forEach( (row) => {
                listado.push(row);
            });
        })
      return listado;
    } catch (error) {
      logger.error('Error:', error);
    }
  }
  async getById(id) {
    try {
        const item = [];
        await knex.from(this.collection).select('*').where('id',id)
            .then((rows) => {
                rows.forEach( (row) => {
                    item.push(row);
                });
            })
        return item[0];
    } catch (error) {
      logger.error('Error:', error);
    }
  }
  async save(producto) {
    try {
      const fecha = new Date().toLocaleString();
      let nextID = 1;
      let agregarData;
      const productsList = await this.getAll();
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

     await knex(this.collection).insert(agregarData)
      .then(()=> logger.info('Product Inserted'));
      const document = []
      await knex.from(this.collection).select('*').where('code',nextID)
      .then((rows) => {
          rows.forEach( (row) => {
              document.push(row);
          });
        })
      logger.info('create new product: ', {document});
      return document; 
    } catch (error) {
      logger.error(error); throw error;
    }
  }
  async deleteById(id) {
    try {
      await knex(this.collection).where('id',id).del()
        .then(()=> logger.info('Data deleted'));
    }catch (error) {
      logger.error('Error:', error);
    };
  }

  async deleteAll() {
    try {
        await knex(this.collection).del()
            .then(()=> logger.info('Data deleted'));
    } catch (error) {
      logger.error('Error:', error);
    };
  }
  async update(id, element) {
    const fecha = new Date().toLocaleString();
    const productUpdate = {timestamp: fecha,...element};
    await knex.from(this.collection).where('id',id).update(productUpdate)
            .then(()=> logger.info('Product updated'))
            .catch((error)=> {  logger.info('Error: ',error); throw error});
    const elementUpdated = await this.getById(id);
    return elementUpdated;
  }
  
  async newCarrito(){
    try{
      const fecha = new Date().toLocaleString();
      let carritoNuevo={timestamp: fecha,products: '[]' };
      await knex(this.collection).insert(carritoNuevo)
        .then(()=> logger.info('Cart created'))
      const document = await knex(this.collection).select('*').orderBy('id','desc').limit(1)
      const {element} = document;
      logger.info('carrito creado',document[0]);
      return document[0].id; 
    } catch (error) {
        logger.error('Error: ', error);
        throw error;
    }
  }

  async getCarrito(carritoId){
    try{
        const item = [];
        await knex.from(this.collection).select('*').where('id',carritoId)
            .then((rows) => {
                rows.forEach( (row) => {
                    item.push(row);
                });
            })
        const carritoElegido = item[0];
        JSON.parse(carritoElegido.products);

        return carritoElegido;
    } catch (error) {
        logger.error('Error: ', error);
        throw error;
    }
  }

  async agregarProductos(carritoId,productos){
    try {
      const fecha = new Date().toLocaleString();
      let carritoModificado; 
      const carritoElegido = await this.getById(carritoId);
      const productsOriginal = JSON.parse(carritoElegido.products);
      
      if ( productsOriginal.length === 0 ){
        
        await knex.from(this.collection).where('id',carritoId).update({timestamp:fecha,products: JSON.stringify(productos)})
        .then(()=> logger.info('Cart updated'))
        .catch((error)=> {  logger.info('Error: ',error); throw error});
      }else{
        productos.forEach( (produ) => {
          const productoRepetido = productsOriginal.find((producto) => producto.id === produ.id);
          if (productoRepetido){
            produ.quantity+=productoRepetido.quantity;
            produ.timestamp=fecha;
          }else{
            logger.info('El producto no figura en el carrito');
          }
        });
        await knex.from(this.collection).where('id',carritoId).update({timestamp:fecha,products: JSON.stringify(productos)})
        .then(()=> logger.info('Cart updated'))
        .catch((error)=> {  logger.info('Error: ',error); throw error});

      }
      carritoModificado = await this.getById(carritoId);
      JSON.parse(carritoModificado.products,null,2)
    } catch (error) {
      logger.error('Error: ', error);
      throw error;
    }
  }

  async vaciarCarrito(carritoId){
    try{
      const fecha = new Date().toLocaleString();
      await knex.from(this.collection).where('id',carritoId).update({timestamp:fecha,products: '[]'});
    } catch (error) {
        logger.error('Error: ', error);
        throw error;
    }
  }
  async borrarItem(carritoId, productoId){
    try{
        const fecha = new Date().toLocaleString();
        const productsList = [];
        
        await knex(this.collection).select('*').where('id',carritoId)
          .then((rows)=> {
              rows.forEach( (row) => {
                  productsList.push(...JSON.parse(row.products));
              })
          })
        const productIndex = productsList.findIndex((prod) => prod.id === parseInt(productoId));
        productsList.splice(productIndex,1);
        await knex.from(this.collection).where('id',carritoId).update({timestamp:fecha,products: JSON.stringify(productsList)});
        const documents = await this.getById(carritoId)
        // const documents = await knex.from(this.collection).where('id',carritoId).update({timestamp:fecha,products:productLoader});
        if(documents) {
          return true;
        }else{
          return false;
        };  
    } catch (error) {
        logger.error('Error: ', error);
        throw error;
    }
}
}

export default SqliteContainer;