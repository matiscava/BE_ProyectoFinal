const express = require('express');
const productosRouter = express.Router();

const ObjetoFS = require('./Objetos');

const productos = new ObjetoFS('./productos.json');

const admin = true;

const PORT = process.env.PORT || 8080;

productosRouter.get('/', async (req,res)=>{   
    const productsList = await productos.getAll()
    res.json(productsList)
});

productosRouter.post('/', async (req,res)=>{
    const objetoNuevo = req.body;
    if(admin){
        await productos.save(objetoNuevo);
        res.send({
            message: 'Se ha cargado un nuevo producto',
            data: objetoNuevo
        });
    }else{
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
    }
})

productosRouter.delete('/:id', async (req,res)=>{
    const findID = parseInt(req.params.id);
    if(admin){
        await productos.deleteById(findID);
        const productsList = await productos.getAll()
    
        res.send({
            message: 'Se ha eleiminado el producto',
            data: productsList
        });
    }else{
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
    }

})

productosRouter.get('/:id', async (req,res)=>{   
    const findID = parseInt(req.params.id);
    const findObjeto = await productos.getById(findID)
    if(findObjeto===null){
        res.send({message: `El elemento con el id: ${findID}, no existe`});
    }else{
        res.json(findObjeto);
    }
});

productosRouter.put('/:id', async (req,res)=>{   

    findID = parseInt(req.params.id);
    const productoPostman = req.body;
    if(admin){
        const productoModificado = await productos.update(findID,productoPostman)
        
        res.send({
            message: 'Se modifico el producto',
            data: productoModificado
        });
    }else{
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
    }
});

module.exports = productosRouter;