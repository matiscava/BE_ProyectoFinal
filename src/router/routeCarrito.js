
const express = require('express');
const carritoRouter = express.Router();
const path = require('path');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const twilio = require('twilio')
const logger = require('./../logger')



const { cartDao: cartsDao , productDao , userDao: usersDao , ticketDao} = require('../daos');

//FUNCIONES

const mailOptions = (photo,mail,html) => ({
    from: 'jorgecoronabackend@gmail.com', // sender address
    to: ['jorgecoronabackend@gmail.com',mail], // list of receivers
    subject: "[ALERT] Cart Ticket", // Subject line
    attachments: 
    [
      {path: photo}
    ],
    html: html // html body
  })
/* TWILIO */
const accountSid = 'AC438284ec95bd807c728609de4ee77587';
const authToken = '3a1e7dfeeaabb01b320149c357be907a';
const client = twilio(accountSid , authToken)


const sendMessage = async (options) => {
  try{
    const message = await client.messages.create(options)
    logger.info(message);
  }
  catch (err)
  {
    logger.error(err);
  } 
}


/* NODEMAILER */

const transporter = nodemailer.createTransport( {
    service: 'gmail',
    port: 587,
    auth: {
      user: 'jorgecoronabackend@gmail.com',
      pass: 'jorgecorona55'
    }
  } )  

//MUESTRA LA LISTA DE PRODUCTOS

carritoRouter.get('/', async (req,res)=>{   
    const data = await productDao.getAll();
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
        logger.info({message: `Carrito creado con el ID ${carritoID}`})
        req.session.carritoID = carritoID;
        res.redirect(`carrito/${carritoID}/productos`)
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
    let cantidadReq = parseInt(productoReq.quantity)
    if( isNaN(cantidadReq) || cantidadReq === null) cantidadReq=1;
    productsList.push(...carritoElegido.products)
    const prodRepetido = await productsList.find(prod => prod.id === producto.id )
    const filtroIndex = await productsList.findIndex(prod => prod.code===producto.code);
    
    
    if(prodRepetido && filtroIndex >= 0){
        productsList[filtroIndex].quantity += cantidadReq;
        if (productsList[filtroIndex].quantity > productsList[filtroIndex].stock){
            productsList[filtroIndex].quantity = productsList[filtroIndex].stock
        }
    }else{
        let productoACargar = {...producto,quantity:cantidadReq}
        productsList.push(productoACargar)
    }
    
    if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        await cartsDao.agregarProductos(carritoID,productsList);
    }
        
    const carritoActualizado = await cartsDao.getCarrito(carritoID);
    if(error.length!==0){
        logger.info({
            message: 'Se ha modificado el carrito',
            data: carritoActualizado,
            error: error
        })
    }else{
        logger.info({
            message: 'Se ha modificado el carrito',
            data: carritoActualizado
        })
    }
    res.redirect(`/api/carrito/${carritoID}/productos`)
    })

//MUESTRA LOS PRODUCTOS DEL CARRITO

carritoRouter.get('/:id/productos', async (req,res) => {
    const carritoID = req.params.id;
    const carritoElegido = await cartsDao.getById(carritoID);
    const productList = await productDao.getAll();
    const idMongo = req.session && req.session.idMongo;
    const usuario = await usersDao.getById(idMongo);
    let precioFinal = 0;
    carritoElegido.products.forEach( (producto) => {
        let subTotal = producto.quantity * producto.price
        precioFinal += subTotal;
    });

    if (carritoElegido===undefined){
        res.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
    }else{
        // res.send(carritoElegido)
        res.render(path.join(process.cwd(), '/views/pages/cartView.ejs'), {usuario, cart: carritoElegido, cartID: carritoID, productsList: productList, precioFinal})

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
    const producto = await productDao.getById(productoID);
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

carritoRouter.get( '/:id/productos/compra', async ( req , res ) => {
    const carritoID = req.params.id;
    const carritoElegido = await cartsDao.getById(carritoID);
    const idMongo = req.session && req.session.idMongo;
    const usuario = (await usersDao.getById(idMongo)).toObject();
    let precioFinal = 0;
    carritoElegido.products.forEach( (producto) => {
        let subTotal = producto.quantity * producto.price
        precioFinal += subTotal;
    });
    const cartList = {cart: carritoElegido}
    
    let ticketCompra = {...usuario,...cartList};
    let htmlItems = '';
    // logger.info(typeof ticketCompra.cart.products)
    const ticketId = await ticketDao.createTicket(ticketCompra)

    for (const product of ticketCompra.cart.products) {
        let cadenaString = `   <div class="cartItemsTexts">
        <p>${product.title}</p>
        <p>Cantidad: ${product.quantity}</p>
        <p>Valor por unidad: $${product.price}</p>
        <p>Subtotal: $${product.price * product.quantity}</p>
      </div>`;
      htmlItems+=cadenaString;
    }

    const html = `<h2>Felicitaciones ${usuario.username}, ha finalizado su compra</h2>
    <p>El número de referencia es ${ticketId}</p>
    ${htmlItems}
    <p class="cartValorTotal">Total: $${precioFinal}</p>
    `
    const cuerpoWhatsapp = {
        body: `Felicitaciones ${usuario.username}, ha finalizado su compra.El número de referencia es ${ticketId}`,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+${usuario.phone}`
    }
    sendMessage(cuerpoWhatsapp)
    transporter.sendMail(mailOptions(usuario.photo , usuario.email , html), ( err , info ) => {
        if(err) {
          logger.error(err);
          return err
        }
        logger.info(info);
      })
    await cartsDao.deleteById(carritoID)
    

    res.render(path.join(process.cwd(), '/views/pages/cartBuy.ejs'), { cartTicket: ticketCompra, ticketId: ticketId, precioFinal})

})

module.exports = carritoRouter;