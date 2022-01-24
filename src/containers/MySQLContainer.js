const options = require('../config');
const knex = require('knex')(options.mysql);

class MySQLContainer {
  constructor(collection,table) {
    this.init(table);
    this.collection = collection;
  }
  async init (table) {
    try{
      if (!this.conexion){
        this.conexion = knex.schema.createTable(this.collection,table)
      }
    }catch (error) {
      console.error(`error`, error);
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
      console.error('Error:', error);
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
      console.error('Error:', error);
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
      .then(()=> console.log('Product Inserted'));
      const document = []
      await knex.from(this.collection).select('*').where('code',nextID)
      .then((rows) => {
          rows.forEach( (row) => {
              document.push(row);
          });
        })
      console.log('create new product: ', {document});
      return document; 
    } catch (error) {
      console.error(error); throw error;
    }
  }
  async deleteById(id) {
    try {
      await knex(this.collection).where('id',id).del()
        .then(()=> console.log('Data deleted'));
    }catch (error) {
      console.error('Error:', error);
    };
  }

  async deleteAll() {
    try {
        await knex(this.collection).del()
            .then(()=> console.log('Data deleted'));
    } catch (error) {
      console.error('Error:', error);
    };
  }
  async update(id, element) {
    const fecha = new Date().toLocaleString();
    const productUpdate = {timestamp: fecha,...element};
    await knex.from(this.collection).where('id',id).update(productUpdate)
            .then(()=> console.log('Product updated'))
            .catch((error)=> {  console.log('Error: ',error); throw error});
    const elementUpdated = await this.getById(id);
    return elementUpdated;
  }
  
  async newCarrito(){
    try{
      const fecha = new Date().toLocaleString();
      let carritoNuevo={timestamp: fecha,products: '[]' };
      await knex(this.collection).insert(carritoNuevo)
        .then(()=> console.log('Cart created'))
      const document = await knex(this.collection).select('*').orderBy('id','desc').limit(1)
      const {element} = document;
      console.log('carrito creado',document[0]);
      return document[0].id; 
    } catch (error) {
        console.error('Error: ', error);
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
        return item[0];
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
  }

  async agregarProductos(carritoId,productos){
    try {
      const fecha = new Date().toLocaleString();
      let carritoModificado; 
      const carritoElegido = await this.getById(carritoId);
      const productsOriginal = JSON.parse(carritoElegido.products);
      console.log(productsOriginal.length);
      
      if ( productsOriginal.length === 0 ){
        
        await knex.from(this.collection).where('id',carritoId).update({timestamp:fecha,products: JSON.stringify(productos)})
        .then(()=> console.log('Cart updated'))
        .catch((error)=> {  console.log('Error: ',error); throw error});
      }else{
        productos.forEach( (produ) => {
          const productoRepetido = productsOriginal.find((producto) => producto.id === produ.id);
          if (productoRepetido){
            produ.quantity+=productoRepetido.quantity;
            produ.timestamp=fecha;
          }else{
            console.log('El producto no figura en el carrito');
          }
        });
        await knex.from(this.collection).where('id',carritoId).update({timestamp:fecha,products: JSON.stringify(productos)})
        .then(()=> console.log('Cart updated'))
        .catch((error)=> {  console.log('Error: ',error); throw error});

      }
      carritoModificado = await this.getById(carritoId);
      JSON.parse(carritoModificado.products);
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  }

  async vaciarCarrito(carritoId){
    try{
      const fecha = new Date().toLocaleString();
      await knex.from(this.collection).where('id',carritoId).update({timestamp:fecha,products: '[]'});
    } catch (error) {
        console.error('Error: ', error);
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
        console.error('Error: ', error);
        throw error;
    }
}
}

module.exports = MySQLContainer;