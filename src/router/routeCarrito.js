
const express = require('express');
const carritoRouter = express.Router();
const path = require('path');

const { cartDao: cartsDao , productDao: productsDao , userDao: usersDao, productDao } = require('../daos');

// carritoRouter.get('/', async (req,res)=>{
//     const data = await cartsDao.getAll();
//     const idMongo = req.session && req.session.idMongo;
//     const usuario = await usersDao.getById(idMongo);
//     const productsList = await productsDao.getAll();

//     res.render(path.join(process.cwd(), '/views/pages/carts.ejs'), {usuario: usuario,productsList: productsList})

// })
//MUESTRA LA LISTA DE PRODUCTOS

carritoRouter.get('/', async (req,res)=>{   
    const data = await productsDao.getAll();
    const idMongo = req.session && req.session.idMongo;
    const carritoID = req.session && req.session.carritoID;
    const usuario = await usersDao.getById(idMongo);
    const listaCarritos = await cartsDao.getAll();
    const carrito = await cartsDao.getCarrito(carritoID)
    // res.send(data)
    res.render(path.join(process.cwd(), '/views/pages/carts.ejs'), {usuario: usuario, carrito: carrito, listaCarritos})
});

//CREA UN CARRITO NUEVO

carritoRouter.post('/', async (req,res)=>{
    const carritoID = await cartsDao.newCarrito();
    const idMongo = req.session && req.session.idMongo;
    const usuario = await usersDao.getById(idMongo);
    if (usuario) {
        console.log({message: `Carrito creado con el ID ${carritoID}`})
        req.session.carritoID = carritoID;
        res.redirect(`carrito/${carritoID}/productos`)
        // res.render(path.join(process.cwd(), '/views/pages/carts.ejs'), {usuario: usuario, carritoID: carritoID})
    }else{
        res.redirect('api/users/login')
    }
})


//AGREGA LOS PRODUCTOS AL CARRITO INGRESANDO UN ARRAY CON LOS ID Y LA QUANTITY DE CADA UNO

carritoRouter.post('/:id/productos', async (req,res) => {
    const carritoID = req.params.id;
    const error = []
    const productoReq = req.body;
    const carritoElegido = await cartsDao.getById(carritoID);
    const producto = (await productDao.getById(productoReq._id)).toObject()
    const productsList = []
    productsList.push(...carritoElegido.products)
    const prodRepetido = await productsList.find(prod => prod.id === producto.id )
    const filtroIndex = await productsList.findIndex(prod => prod.code===producto.code);
    // console.log(prodRepetido.quantity += parseInt(productoReq.quantity));
    if(prodRepetido && filtroIndex >= 0){
        productsList[filtroIndex].quantity += parseInt(productoReq.quantity);
    }else{
        productsList.push(producto)
    }

    // if(prodRepetido){
    //     await productsList[filtroIndex].quantity += producto.quantity;
    // }
    
    // await productsList.splice(1,filtroIndex);
    

    // for  (prod of productoReq) {
    //     const producto = await productsDao.getById(prod.id);
    //     let productoACargar ;

    //     if(producto===null){
    //         error.push({error: -3, descripcion: `el objeto ID ${prod.id} no existe ingrese otro ID`});
        //     error.push({error: -3, descripcion: `el objeto ID ${prod.id} no existe ingrese otro ID`});
        // }
    //         await productoReq.products.splice(1,filtroIndex);
    //     }

    //     const cantidad = parseInt(prod.quantity);
    //     if( isNaN(cantidad) ||cantidad===""||cantidad===undefined){
    //         productoACargar = {...producto,quantity:1}
    //     }else{
    //         productoACargar = {...producto,quantity:cantidad}
    //     }
    //     productsList.push(productoACargar)
    // }
    let productoACargar = {...producto,quantity:parseInt(productoReq.quantity)}
    
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
    const productList = await productsDao.getAll();
    const idMongo = req.session && req.session.idMongo;
    const usuario = await usersDao.getById(idMongo);

    if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        // res.send(carritoElegido)
        res.render(path.join(process.cwd(), '/views/pages/cartView.ejs'), {usuario, cart: carritoElegido, cartID: carritoID, productsList: productList})

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