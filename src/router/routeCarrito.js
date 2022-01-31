
const express = require('express');
const carritoRouter = express.Router();


const { cartDao: cartsDao } = require('../daos');
// const cartsDao = new cartDao();

const { productDao: productsDao } = require('../daos');
// const productsDao = new productDao();

carritoRouter.get('/', async (req,res)=>{
    const data = await cartsDao.getAll();
    res.send(data )
})

//CREA UN CARRITO NUEVO

carritoRouter.post('/', async (req,res)=>{
    const carritoID = await cartsDao.newCarrito();
    res.send({message: `Carrito creado con el ID ${carritoID}`})
})


//AGREGA LOS PRODUCTOS AL CARRITO INGRESANDO UN ARRAY CON LOS ID Y LA QUANTITY DE CADA UNO

carritoRouter.post('/:id/productos', async (req,res) => {
    const carritoID = req.params.id;
    const error = []

    const productoReq = req.body;
    const carritoElegido = await cartsDao.getCarrito(carritoID);
    const productsList = []
    for await (prod of productoReq)  {
        const producto = await productsDao.getById(prod.id);
        let productoACargar ;

        if(producto===null){
            const filtroIndex = await productoReq.findIndex((producto) => producto.id===prod.id);
            error.push({error: -3, descripcion: `el objeto ID ${prod.id} no existe ingrese otro ID`});
            await productoReq.products.splice(1,filtroIndex);
        }

        const cantidad = parseInt(prod.quantity);
        if( isNaN(cantidad) ||cantidad===""||cantidad===undefined){
            productoACargar = {...producto,quantity:1}
        }else{
            productoACargar = {...producto,quantity:cantidad}
        }
        productsList.push(productoACargar)
    }

    
    if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        await cartsDao.agregarProductos(carritoID,productsList);
    }
        
    const carritoActualizado = await cartsDao.getCarrito(carritoID);
    if(error.length!==0){
        res.send({
            message: 'Se ha modificado el carrito',
            data: carritoActualizado,
            error: error
        })
    }else{
        res.send({
            message: 'Se ha modificado el carrito',
            data: carritoActualizado
        })
    }
    })

//MUESTRA LOS PRODUCTOS DEL CARRITO

carritoRouter.get('/:id/productos', async (req,res) => {
    const carritoID = req.params.id;
    const carritoElegido = await cartsDao.getCarrito(carritoID);
    if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        res.send(carritoElegido)
    }
})

//BORRA EL CARRITO

carritoRouter.delete('/:id', async (req,res) => {
    const carritoID = req.params.id;
    const carritoElegido = await cartsDao.getCarrito(carritoID);
    if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        await cartsDao.vaciarCarrito(carritoID);
        res.send({message: `Se ha vaciado el carrito ID ${carritoID}`})
    }
})

//BORRA UN PRODUCTO DEL CARRITO

carritoRouter.delete('/:id/productos/:id_prod', async (req,res) => {
    const carritoID = req.params.id;
    const productoID = req.params.id_prod;
    const producto = await productsDao.getById(productoID);
    const carritoElegido = await cartsDao.getCarrito(carritoID);
    if(producto===null){
        res.send({error: -3, descripcion: `el producto ID ${productoID} no existe ingrese otro ID`});
    }else if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        const eliminado =  await cartsDao.borrarItem(carritoID, productoID);
        if(eliminado){
            res.send({message: `Se ha eliminado el producto ID ${productoID} del carrito ID ${carritoID}`})
        }else{
            res.send({error: -3, descripcion: `el producto ID ${productoID} no existe en el carrito ID ${carritoID}`});
        }
    }
})

module.exports = carritoRouter;