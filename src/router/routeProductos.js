const express = require('express');
const productosRouter = express.Router();
const path = require('path')
const logger = require('./../logger');


const { productDao , userDao } = require('../daos');

//MUESTRA LA LISTA DE PRODUCTOS

productosRouter.get('/', async (req,res)=>{  
    const data = await productDao.getAll();
    const idMongo = req.session && req.session.idMongo;
    const usuario = await userDao.getById(idMongo);
    // res.send(data)
    res.render(path.join(process.cwd(), '/views/pages/products.ejs'), {usuario: usuario, productsList: data})
});

//CARGA UN PRODUCTO NUEVO

productosRouter.post('/', async (req,res)=>{
    const objetoNuevo = req.body;
    const idMongo = req.session && req.session.idMongo;
    const usuario = await userDao.getById(idMongo);
    
    if(usuario.admin){
        const productoNuevo = await productDao.createProduct(objetoNuevo);
        logger.info(`Se ha creado un nuevo producto: ${productoNuevo}`);

        res.redirect('/')

    }else{
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
    }
})

//BORRA EL PRODUCTO SELECCIONADO

productosRouter.delete('/:id', async (req,res)=>{
    const findID = req.params.id;
    const producto = await productDao.getById(findID);
    const idMongo = req.session && req.session.idMongo;
    const usuario = await userDao.getById(idMongo);

    if(producto===null){
        res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
    } else if(usuario.admin){
        await productDao.deleteById(findID);
        const productsList = await productDao.getAll()
    
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
    const findObjeto = await productDao.getById(findID)
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
    const findObjeto = await productDao.getById(findID)
    const idMongo = req.session && req.session.idMongo;
    const usuario = await userDao.getById(idMongo);

    if(findObjeto===null){
        res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
    }else if(usuario.admin){
        const productoModificado = await productDao.update(findID,productoPostman)
        
        res.send({
            message: 'Se modifico el producto',
            data: productoModificado
        });
    }else{
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
    }
});

module.exports = productosRouter;