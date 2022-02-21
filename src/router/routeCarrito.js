import express from 'express';
const carritoRouter = express.Router();

import cartController from './../controllers/cart.js';


//MUESTRA LA LISTA DE PRODUCTOS

carritoRouter.get('/', cartController.getAll);

//CREA UN CARRITO NUEVO

carritoRouter.post('/', cartController.createCart )


//AGREGA LOS PRODUCTOS AL CARRITO INGRESANDO UN ARRAY CON LOS ID Y LA QUANTITY DE CADA UNO

carritoRouter.post('/:id/products', cartController.addProductToCart )

//MUESTRA LOS PRODUCTOS DEL CARRITO

carritoRouter.get('/:id/products', cartController.getCartProducts )

//BORRA EL CARRITO

carritoRouter.delete('/:id', cartController.removeCart )

//BORRA UN PRODUCTO DEL CARRITO

carritoRouter.delete('/:id/products/:id_prod', cartController.removeCartProduct )

//FINALIZAR LA COMPRA

carritoRouter.get( '/:id/products/compra', cartController.mekeTicket )

export default carritoRouter;