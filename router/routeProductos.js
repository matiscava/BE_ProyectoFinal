const express = require('express');
const productosRouter = express.Router();

const ObjetoFS = require('../classes/Products');
const productos = new ObjetoFS('./db/productos.json');

const admin = true;

//MUESTRA LA LISTA DE PRODUCTOS

productosRouter.get('/', async (req,res)=>{   
    const productsList = await productos.getAll()
    const titulo = 'Lista de Productos';
    // res.json(productsList)
    res.render('./productos.pug', {productsList,titulo,admin:admin})

});

//CARGA UN PRODUCTO NUEVO

productosRouter.post('/', async (req,res)=>{
    const objetoNuevo = req.body;
    if(admin){
        const productoNuevo = await productos.save(objetoNuevo);
        // res.send({
        //     message: 'Se ha cargado un nuevo producto',
        //     data: productoNuevo
        // });
     res.render('./index.pug',{admin:admin});

    }else{
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
    }
})

//BORRA EL PRODUCTO SELECCIONADO

productosRouter.delete('/:id', async (req,res)=>{
    const findID = parseInt(req.params.id);
    const producto = await productos.getById(findID);
    if(producto===null){
        res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
    } else if(admin){
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

//MUESTRA UN PRODUCTO ESPECIFICO

productosRouter.get('/:id', async (req,res)=>{   
    const titulo = 'Lista de Productos';

    const findID = parseInt(req.params.id);
    const findObjeto = await productos.getById(findID)
    if(findObjeto===null){
        res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
    }else{
        // res.json(findObjeto);
        console.log(findObjeto);
         res.render('./producto.pug', {product: findObjeto,titulo,admin:admin})

    }
});

//MODIFICA UN PRODUCTO ESPECIFICO

productosRouter.put('/:id', async (req,res)=>{   

    findID = parseInt(req.params.id);
    const productoPostman = req.body;
    const findObjeto = await productos.getById(findID)
    if(findObjeto===null){
        res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
    }else if(admin){
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