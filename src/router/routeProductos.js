const express = require('express');
const productosRouter = express.Router();

// const ObjetoFS = require('../containers/FileContainer');
// const productos = new ObjetoFS('./db/productos.json');
const { productDao } = require('../daos');
const productsDao = new productDao();

const admin = true;

//MUESTRA LA LISTA DE PRODUCTOS

productosRouter.get('/', async (req,res)=>{   
    const data = await productsDao.getAll();
    res.send(data )
});

//CARGA UN PRODUCTO NUEVO

productosRouter.post('/', async (req,res)=>{
    const objetoNuevo = req.body;
    if(admin){
        const productoNuevo = await productsDao.save(objetoNuevo);
        res.send({
            message: 'Se ha cargado un nuevo producto',
            data: productoNuevo
        });
    }else{
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
    }
})

//BORRA EL PRODUCTO SELECCIONADO

productosRouter.delete('/:id', async (req,res)=>{
    const findID = req.params.id;
    const producto = await productsDao.getById(findID);
    if(producto===null){
        res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
    } else if(admin){
        await productDao.deleteById(findID);
        const productsList = await productsDao.getAll()
    
        res.send({
            message: 'Se ha eleiminado el producto',
            data: productsList
        });
    }else{
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
    }

})

//MUESTRA UN PRODUCTO ESPECIFICO

productosRouter.get('/:id', async (req,res)=>{   
    const findID = req.params.id;
    const findObjeto = await productsDao.getById(findID)
    if(findObjeto===null){
        res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
    }else{
        res.json(findObjeto);
    }
});

//MODIFICA UN PRODUCTO ESPECIFICO

productosRouter.put('/:id', async (req,res)=>{   

    findID = req.params.id;
    const productoPostman = req.body;
    const findObjeto = await productsDao.getById(findID)
    if(findObjeto===null){
        res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
    }else if(admin){
        const productoModificado = await productsDao.update(findID,productoPostman)
        
        res.send({
            message: 'Se modifico el producto',
            data: productoModificado
        });
    }else{
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
    }
});

module.exports = productosRouter;