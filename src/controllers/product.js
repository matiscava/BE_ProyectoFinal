import logger from '../logger/index.js';
import path from 'path'

import Singleton from '../utils/Singleton.js';

const { daos } = Singleton.getInstance()
const { productsDao , usersDao } = daos

const getAll = async (ctx)=>{  
  const data = await productsDao.getAll();
  const idMongo = ctx.request.session && ctx.request.session.idMongo;
  const usuario = await usersDao.getById(idMongo);
  // ctx.response.send(data)
  ctx.response.render(path.join(process.cwd(), '/views/pages/products.ejs'), {usuario: usuario, productsList: data})
}

const createProduct = async (ctx)=>{
  const objetoNuevo = ctx.request.body;
  const idMongo = ctx.request.session && ctx.request.session.idMongo;
  const usuario = await usersDao.getById(idMongo);
  
  if(usuario.admin){
      const productoNuevo = await productsDao.createProduct(objetoNuevo);
      logger.info(`Se ha creado un nuevo producto: ${productoNuevo}`);

      ctx.response.redirect('/')

  }else{
      ctx.response.send({error: -1, descripcion: `ruta ${ctx.request.originalUrl} método ${ctx.request.method} no autorizado`});
  }
}

const deleteProduct = async (ctx)=>{
  const findID = ctx.request.params.id;
  const producto = await productsDao.getById(findID);
  const idMongo = ctx.request.session && ctx.request.session.idMongo;
  const usuario = await usersDao.getById(idMongo);

  if(producto===null){
      ctx.response.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
  } else if(usuario.admin){
      await productsDao.deleteById(findID);
      const productsList = await productsDao.getAll()
  
      ctx.response.send({
          message: 'Se ha eleiminado el producto',
          data: productsList
      });
  }else{
      ctx.response.send({error: -1, descripcion: `ruta ${ctx.request.originalUrl} método ${ctx.request.method} no autorizado`});
  }

} 

const getProduct = async (ctx)=>{   
  const findID = ctx.request.params.id;
  const findObjeto = await productsDao.getById(findID)
  if(findObjeto===null){
      ctx.response.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
  }else{
      ctx.response.json(findObjeto);
  }
}

const setProduct = async (ctx)=>{   

  findID = ctx.request.params.id;
  const productoPostman = ctx.request.body;
  const findObjeto = await productsDao.getById(findID)
  const idMongo = ctx.request.session && ctx.request.session.idMongo;
  const usuario = await usersDao.getById(idMongo);

  if(findObjeto===null){
      ctx.response.send({error: -3, descripcion: `el objeto ID ${findID} no existe ingrese otro ID`});
  }else if(usuario.admin){
      const productoModificado = await productsDao.update(findID,productoPostman)
      
      ctx.response.send({
          message: 'Se modifico el producto',
          data: productoModificado
      });
  }else{
      ctx.response.send({error: -1, descripcion: `ruta ${ctx.request.originalUrl} método ${ctx.request.method} no autorizado`});
  }
}

export default {
  getAll,
  createProduct,
  deleteProduct,
  getProduct,
  setProduct
}