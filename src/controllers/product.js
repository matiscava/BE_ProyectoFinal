import logger from '../logger/index.js';
import path from 'path'

import Singleton from '../utils/Singleton.js';

const { daos } = Singleton.getInstance()
const { productsDao , usersDao } = daos

const getAll = async (req,res)=>{  
  const data = await productsDao.getAll();
  const idMongo = req.session && req.session.idMongo;
  const usuario = await usersDao.getById(idMongo);
  res.render(path.join(process.cwd(), '/views/pages/products.ejs'), {usuario: usuario, productsList: data})
}

const createProduct = async (req,res)=>{
  const objetoNuevo = req.body;
  const idMongo = req.session && req.session.idMongo;
  const usuario = await usersDao.getById(idMongo);
  
  if(usuario.admin){
      const productoNuevo = await productsDao.createProduct(objetoNuevo);
      logger.info(`Se ha creado un nuevo producto: ${productoNuevo}`);

      res.redirect('/')

  }else{
      res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
  }
}

const deleteProduct = async (req,res)=>{
  const findID = req.params.id;
  const producto = await productsDao.getById(findID);
  const idMongo = req.session && req.session.idMongo;
  const usuario = await usersDao.getById(idMongo);

  if(producto===null){
      res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
  } else if(usuario.admin){
  // }else{
      await productsDao.deleteById(findID);
      const productsList = await productsDao.getAll()
  
      res.send({
          message: 'Se ha eleiminado el producto',
          data: productsList
      });
  }else{
      res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
  }

} 

const getProduct = async (req,res)=>{   
  const findID = req.params.id;
  const findObjeto = await productsDao.getById(findID)
  if(findObjeto===null){
      res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
  }else{
      res.json(findObjeto);
  }
}

const setProduct = async (req,res)=>{   

  const findID = req.params.id;
  const productoPostman = req.body;
  const findObjeto = await productsDao.getById(findID)
  const idMongo = req.session && req.session.idMongo;
  const usuario = await usersDao.getById(idMongo);

  if(findObjeto===null){
      res.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
  }else if(usuario.admin){
  // }else{
      const productoModificado = await productsDao.changeProduct(findID,productoPostman)
      
      res.send({
          message: 'Se modifico el producto',
          data: productoModificado
      });
  }else{
      res.send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
  }
}

export default {
  getAll,
  createProduct,
  deleteProduct,
  getProduct,
  setProduct
}