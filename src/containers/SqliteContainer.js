const knex = require('knex');

class SqliteContainer {
  constructor(config, table) {
    this.table =  new knex(config).Database(table);
    this.init;
  }
  async init () {
    const db = new knex(this.config).Database(this.table);
    if(!fs.existsSync(this.table)){
      console.log("creating database file");
      fs.openSync(this.table, "w");
      db.run("CREATE TABLE users (username TEXT, password TEXT, email TEXT)", function(createResult){
        if(createResult) throw createResult;
      });
      
      console.log("database initialized");
    }
  
    return db;
  }
  async getAll() {
    try {
      const listado = [];
      await this.conexion.from(this.table)
        .select('*')
        .then((rows) => {
          rows.forEach( (row) => {
            listado.push(row)
          });
        })
      return listado;
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
            agregarData={...producto,code:nextID,timestamp:fecha}
        }else{
            for(let i=0;i<productsList.length;i++){
                while( productsList[i].code >= nextID){
                    nextID++;
                }
            }
            agregarData={...producto,code:nextID,timestamp:fecha}
        }

      const [id] = await this.conexion(this.table).insert(agregarData);
      return id; 
    } catch (error) {
      console.error(error); throw error;
    }
  }
  async getById(id) {
    try {
      const contenido = await this.conexion.from(this.table)
        .select('*').where('id', '=', id);
      console.log({contenido});
      if (contenido.length === 0) {
        return null;
      } else {
        return contenido[0];
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async deleteById(id) {
    try {
       const response =  await this.conexion(this.table).where('id',id).del();
       console.log('deleteById: ', {response});
    }catch (error) {
      console.error('Error:', error);
    };
  }

  async deleteAll() {
    try {
      const response =  await this.conexion(this.table).del();
       console.log('deleteById: ', {response});
    } catch (error) {
      console.error('Error:', error);
    };
  }
  async update(id, element) {
    const response =  await this.conexion(this.table).where('id',id).update(element);

    if (!response) {
      console.error(`Elemento con el id: '${id}' no fue encontrado`);
      return null;
    }

    console.log('Elemente updated: ', {response});
    return response;
  }
}

module.exports = SqliteContainer;