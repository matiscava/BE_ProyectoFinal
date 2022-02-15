import express from 'express';

const indexRouter = express.Router();

import carritoRoute from './routeCarrito.js';
import productosRoute from './routeProductos.js';
import usuariosRoute from './routeUser.js';

indexRouter.use('/productos', productosRoute);
indexRouter.use( '/carrito', carritoRoute);
indexRouter.use( '/users' , usuariosRoute);

export default indexRouter;