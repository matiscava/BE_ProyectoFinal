const express = require('express');
const productosRouter = express.Router();

const productController = require('../controllers/product')

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

module.exports = productosRouter;