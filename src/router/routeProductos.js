const express = require('express');
const productosRouter = express.Router();
const path = require('path')

const { productDao: productsDao , userDao: usersDao } = require('../daos');

//MUESTRA LA LISTA DE PRODUCTOS

productosRouter.get('/', async (req,res)=>{   
    const data = await productsDao.getAll();
    const idMongo = req.session && req.session.idMongo;
    const usuario = await usersDao.getById(idMongo);
    // res.send(data)
    res.render(path.join(process.cwd(), '/views/pages/products.ejs'), {usuario: usuario, productsList: data})
});

//CARGA UN PRODUCTO NUEVO

productosRouter.post('/', async (req,res)=>{
    const objetoNuevo = req.body;
    const idMongo = req.session && req.session.idMongo;
    const usuario = await usersDao.getById(idMongo);
    
    if(usuario.admin){
        const productoNuevo = await productsDao.createProduct(objetoNuevo);
        console.log(`Se ha creado un nuevo producto: ${productoNuevo}`);

        res.redirect('/')

    }else{
        res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
    }
})

//BORRA EL PRODUCTO SELECCIONADO

productosRouter.delete('/:id', async (req,res)=>{
    const findID = req.params.id;
    const producto = await productsDao.getById(findID);
    const idMongo = req.session && req.session.idMongo;
    const usuario = await usersDao.getById(idMongo);

    if(producto===null){
        res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
    } else if(usuario.admin){
        await productsDao.deleteById(findID);
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
    const idMongo = req.session && req.session.idMongo;
    const usuario = await usersDao.getById(idMongo);

    if(findObjeto===null){
        res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
    }else if(usuario.admin){
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