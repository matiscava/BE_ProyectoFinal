// import express from 'express';
import Router from 'koa-router';

// const productosRouter = express.Router();

const productosRouter = new Router({
  prefix: '/products'
});

import productController from '../controllers/product.js'

//MUESTRA LA LISTA DE PRODUCTOS

productosRouter.get('/', productController.getAll );

//CARGA UN PRODUCTO NUEVO

productosRouter.post('/', productController.createProduct)

//BORRA EL PRODUCTO SELECCIONADO

productosRouter.delete('/:id', productController.deleteProduct)

//MUESTRA UN PRODUCTO ESPECIFICO

productosRouter.get('/:id', productController.getProduct );

//MODIFICA UN PRODUCTO ESPECIFICO

productosRouter.put('/:id', productController.setProduct );

export default productosRouter;