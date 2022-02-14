
const express = require('express');
const carritoRouter = express.Router();

// const path = require('path');
// const nodemailer = require("nodemailer");
// const smtpTransport = require('nodemailer-smtp-transport');
// const twilio = require('twilio');
// const logger = require('./../logger');


const cartController = require('./../controllers/cart');
// const PersistenceFactory = require('../daos');
// const getPersistence = require('../utils/getPresistence');

// const prueba = await PersistenceFactory.getPersistenceMethod(getPersistence())
// console.log('probando', prueba);

//FUNCIONES

// const mailOptions = (photo,mail,html) => ({
//     from: 'jorgecoronabackend@gmail.com', // sender address
//     to: ['jorgecoronabackend@gmail.com',mail], // list of receivers
//     subject: "[ALERT] Cart Ticket", // Subject line
//     attachments: 
//     [
//       {path: photo}
//     ],
//     html: html // html body
//   })
/* TWILIO */
// const accountSid = 'AC438284ec95bd807c728609de4ee77587';
// const authToken = '3a1e7dfeeaabb01b320149c357be907a';
// const client = twilio(accountSid , authToken)


// const sendMessage = async (options) => {
//   try{
//     const message = await client.messages.create(options)
//     logger.info(message);
//   }
//   catch (err)
//   {
//     logger.error(err);
//   } 
// }


/* NODEMAILER */

// const transporter = nodemailer.createTransport( {
//     service: 'gmail',
//     port: 587,
//     auth: {
//       user: 'jorgecoronabackend@gmail.com',
//       pass: 'jorgecorona55'
//     }
//   } )  

//MUESTRA LA LISTA DE PRODUCTOS

carritoRouter.get('/', cartController.getAll);

//CREA UN CARRITO NUEVO

carritoRouter.post('/', cartController.createCart )


//AGREGA LOS PRODUCTOS AL CARRITO INGRESANDO UN ARRAY CON LOS ID Y LA QUANTITY DE CADA UNO

carritoRouter.post('/:id/productos', cartController.addProductToCart )

//MUESTRA LOS PRODUCTOS DEL CARRITO

carritoRouter.get('/:id/productos', cartController.getCartProducts )

//BORRA EL CARRITO

carritoRouter.delete('/:id', cartController.removeCart )

//BORRA UN PRODUCTO DEL CARRITO

carritoRouter.delete('/:id/productos/:id_prod', cartController.removeCartProduct )

//FINALIZAR LA COMPRA

carritoRouter.get( '/:id/productos/compra', cartController.mekeTicket )

module.exports = carritoRouter;