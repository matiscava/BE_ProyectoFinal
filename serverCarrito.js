
const express = require('express');
const carritoRouter = express.Router();

const ObjetoFS = require('./Objetos');
const productos = new ObjetoFS('./productos.json');

const CarritoFS = require('./Carrito');
const carritos = new CarritoFS('./carritos.json');


carritoRouter.post('/', async (req,res)=>{
    const carritoID = await carritos.newCarrito();
    res.send({message: `Carrito creado con el ID ${carritoID}`})
})

carritoRouter.post('/:id/productos/:id_prod', async (req,res) => {
    const carritoID = parseInt(req.params.id);
    const productoID = parseInt(req.params.id_prod);
    const producto = await productos.getById(productoID);
    const carritoElegido = await carritos.getCarrito(carritoID);
    if(producto===null){
        res.send({error: -3, descripcion: `el objeto ID ${productoID} no existe ingrese otro ID`});
    }else if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        const nuevaCarga = await carritos.agregarProducto(carritoID,producto);
        const carritoActualizado = await carritos.getCarrito(carritoID);
        
        res.send({
            message: 'Se ha modificado el carrito',
            data: carritoActualizado
        })
    }
    
})

carritoRouter.get('/:id/productos', async (req,res) => {
    const carritoID = parseInt(req.params.id);
    const carritoElegido = await carritos.getCarrito(carritoID);
    if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        res.send(carritoElegido)
    }
})

carritoRouter.delete('/:id', async (req,res) => {
    const carritoID = parseInt(req.params.id);
    const carritoElegido = await carritos.getCarrito(carritoID);
    if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        await carritos.vaciarCarrito(carritoID);
        res.send({message: `Se ha eliminado el carrito ID ${carritoID}`})
    }
})
carritoRouter.delete('/:id/productos/:id_prod', async (req,res) => {
    const carritoID = parseInt(req.params.id);
    const productoID = parseInt(req.params.id_prod);
    const producto = await productos.getById(productoID);
    const carritoElegido = await carritos.getCarrito(carritoID);
    if(producto===null){
        res.send({error: -3, descripcion: `el producto ID ${productoID} no existe ingrese otro ID`});
    }else if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        const eliminado =  await carritos.borrarItem(carritoID, productoID);
        if(eliminado){
            res.send({message: `Se ha eliminado el producto ID ${productoID} del carrito ID ${carritoID}`})
        }else{
            res.send({error: -3, descripcion: `el producto ID ${productoID} no existe en el carrito ID ${carritoID}`});
        }
    }
})

module.exports = carritoRouter;