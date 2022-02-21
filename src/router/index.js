import express from 'express';

const indexRouter = express.Router();

import carritoRoute from './routeCarrito.js';
import productosRoute from './routeProductos.js';
import usuariosRoute from './routeUser.js';

indexRouter.use('/products', productosRoute);
indexRouter.use( '/carts', carritoRoute);
indexRouter.use( '/users' , usuariosRoute);

export default indexRouter;