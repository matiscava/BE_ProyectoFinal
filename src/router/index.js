import Router from 'koa-router';

// const indexRouter = express.Router();
const indexRouter = new Router({
  prefix: '/api'
});

import carritoRoute from './routeCarrito.js';
import productosRoute from './routeProductos.js';
import usuariosRoute from './routeUser.js';

// indexRouter.use('/productos', productosRoute);
// indexRouter.use( '/carrito', carritoRoute);
// indexRouter.use( '/users' , usuariosRoute);


indexRouter.use('/products',productosRoute.routes());
indexRouter.use('/carts',carritoRoute.routes());
indexRouter.use('/users',usuariosRoute.routes());


export default indexRouter;