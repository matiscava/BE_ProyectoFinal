const fs = require('fs');
module.exports = class CarritoFS {
    constructor (archivo) {
        this.archivo = archivo;
    }
    async newCarrito(){
        const data = await fs.promises.readFile(`./${this.archivo}` );
        const objeto = JSON.parse(data);
        let nextID = 1;
        let carritoNuevo;
        const fecha = new Date().toLocaleString();
        if(objeto.length===0){
            carritoNuevo={id: nextID, timestamp: fecha, products:[] }
        }else{
            for (let i=0;i<objeto.length ;i++) {
                while( objeto[i].id >= nextID ){
                    nextID++;
                }
            }
            carritoNuevo={id: nextID, timestamp: fecha, products:[]}
        }
        objeto.push(carritoNuevo);
        const dataToJSON = JSON.stringify(objeto,null,2);
        fs.writeFileSync(`./${this.archivo}` , dataToJSON);
        return nextID;
    }
    async agregarProducto(carritoId,producto){
        const data = await fs.promises.readFile(`./${this.archivo}` );
        const carrito = JSON.parse(data);
        const carritoElegido = carrito.find( (carro) => carro.id === carritoId );
        const fecha = new Date().toLocaleString();
       
        carritoElegido.timestamp = fecha;
        const carritoElegidoIndex = carrito.findIndex((carro) => carro.id === carritoId);
        carritoElegido.products.push(...producto);
        carrito.splice(carritoElegidoIndex,1,carritoElegido);
        const dataToJSON = JSON.stringify(carrito,null,2);
        fs.writeFileSync(`./${this.archivo}` , dataToJSON);

    }

    async agregarXId(carritoId,arrayProductos){
        const data = await fs.promises.readFile(`./${this.archivo}` );
        const carrito = JSON.parse(data);
        const carritoElegido = carrito.find( (carro) => carro.id === carritoId );
        const carritoElegidoIndex = carrito.findIndex((carro) => carro.id === carritoId);
        const fecha = new Date().toLocaleString();
       
        carritoElegido.timestamp = fecha;
        arrayProductos.forEach((produ) => {
           
            const productoRepetido = carritoElegido.products.find( (producto) => producto.id === produ.id);
            if(productoRepetido===undefined){
                carritoElegido.products.push(produ);
            }else{
                productoRepetido.timestamp=fecha
                productoRepetido.quantity+=produ.quantity;
            }


        });
 
        carrito.splice(carritoElegidoIndex,1,carritoElegido);
        const dataToJSON = JSON.stringify(carrito,null,2);
        fs.writeFileSync(`./${this.archivo}` , dataToJSON);

    }
    async getCarrito(carritoId){
        const data = await fs.promises.readFile(`./${this.archivo}` );
        const carrito = JSON.parse(data);
        const carritoElegido = carrito.find( (carro) => carro.id === carritoId );

        return carritoElegido;
    }

    async vaciarCarrito(carritoId){
        const data = await fs.promises.readFile(`./${this.archivo}` );
        const carrito = JSON.parse(data);
        const carritoFiltrado = carrito.filter( (carro) => carro.id !== carritoId);
        const dataToJSON = JSON.stringify(carritoFiltrado,null,2);
        fs.writeFileSync(`./${this.archivo}` , dataToJSON);
    }
    async borrarItem(carritoId, productoId){
        const data = await fs.promises.readFile(`./${this.archivo}` );
        const carrito = JSON.parse(data);
        const carritoElegido = carrito.find( (carro) => carro.id === carritoId );
        const fecha = new Date().toLocaleString();
       
        carritoElegido.timestamp = fecha;
        const carritoElegidoIndex = carrito.findIndex((carro) => carro.id === carritoId);
        const productosCarrito = carritoElegido.products;
        const producto = productosCarrito.find((carro) => carro.id === productoId)
        if(producto!==undefined){
            const carritoFiltrado = productosCarrito.filter( (carro) => carro.id !== productoId);
            carritoElegido.products.splice(0,productosCarrito.length)
            carritoElegido.products.push(...carritoFiltrado);    
            carrito.splice(carritoElegidoIndex,1,carritoElegido);
            const dataToJSON = JSON.stringify(carrito,null,2);
            fs.writeFileSync(`./${this.archivo}` , dataToJSON);
            return true;
        }else{
            return false;
        }

    }
}