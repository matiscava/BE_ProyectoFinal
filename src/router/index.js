const express = require('express');

const indexRouter = express.Router();

const carritoRoute = require('./routeCarrito');
const productosRoute = require('./routeProductos');
const usuariosRoute = require('./routeUser');

indexRouter.use('/productos', productosRoute);
indexRouter.use( '/carrito', carritoRoute);
indexRouter.use( '/users' , usuariosRoute);

module.exports = indexRouter;