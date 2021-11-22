const fs = require('fs');
module.exports = class ObjetoFS {
    constructor ( archivo ) {
        this.archivo = archivo;
    }
    async getAll(){ 
        try{
            const data = await fs.promises.readFile(`./${this.archivo}` );
            const objeto = JSON.parse(data);
            return objeto;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async getById (idNum) {
        try{
            const objeto = await this.getAll()
            const objetoFiltrado = objeto.filter(obj => obj.id === idNum);
            if (objetoFiltrado[0]===undefined) {
                return null;
            }else{
            return objetoFiltrado[0];
            }        
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async save(objetoNuevo){
        try{
            const objeto = await this.getAll();
            const fecha = new Date().toLocaleString();
            let nextID = 1
            let agregarData;
            if(objeto.length===0){
                agregarData= {...objetoNuevo, id: nextID, codigo:nextID, timestamp: fecha}
            }else{
                for (let i=0;i<objeto.length ;i++) {
                    while( objeto[i].id >= nextID ){
                        nextID++;
                    }
                }
                agregarData= {...objetoNuevo, id: nextID, codigo:nextID, timestamp: fecha}
            }
            objeto.push(agregarData);
            const dataToJSON = JSON.stringify(objeto,null,2);
            fs.writeFileSync(`./${this.archivo}` , dataToJSON);
            return agregarData;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async deleteById(idNum){
        try{
            const objeto = await this.getAll();
            const objetoFiltrado = objeto.filter(obj => obj.id !== idNum);
            const dataToJSON = JSON.stringify(objetoFiltrado,null,2);
            fs.writeFileSync(`./${this.archivo}` , dataToJSON);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async update(id,elemento){
        try{
            const data = await fs.promises.readFile(`./${this.archivo}` );
            const lista = JSON.parse(data);
            const elementoGuardado = lista.find((obj)=> obj.id === id)
            const elementoIndex = lista.findIndex((obj)=> obj.id === id)
            if (!elementoGuardado){
                console.error(`El elemento con el id: ${id}, no existe`);
                return null;
            }
            const elementoSubido= {
                ...elementoGuardado,
                ...elemento
            }
            lista.splice(elementoIndex,1,elementoSubido)
            const dataToJSON = await JSON.stringify(lista,null,2);
            fs.writeFileSync(`./${this.archivo}` , dataToJSON);

            return elementoSubido;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
}
