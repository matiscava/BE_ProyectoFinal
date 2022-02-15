import express from 'express';
const productosRouter = express.Router();

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