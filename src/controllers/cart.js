import logger from '../logger/index.js';
import path from 'path'

import { cartTicketMailOptions , transporter } from '../utils/nodemailerSettings.js';
import { sendMessage } from '../utils/twilioSettings.js'

import Singleton from '../utils/Singleton.js';

const { daos } = Singleton.getInstance()

const { productsDao , usersDao , cartsDao , ticketsDao} = daos;


const getAll = async (ctx)=>{   
  const idMongo = ctx.request.session && ctx.request.session.idMongo;
  const carritoID = ctx.request.session && ctx.request.session.carritoID;
  const usuario = await usersDao.getById(idMongo);
  const listaCarritos = await cartsDao.getAll();
  const carrito = await cartsDao.getCarrito(carritoID)
  ctx.response.render(path.join(process.cwd(), '/views/pages/carts.ejs'), {usuario: usuario, carrito: carrito, listaCarritos})
}

const createCart = async (ctx)=>{
  const carritoID = await cartsDao.newCarrito();
  const idMongo = ctx.request.session && ctx.request.session.idMongo;
  const usuario = await usersDao.getById(idMongo);
  if (usuario) {
    logger.info({message: `Carrito creado con el ID ${carritoID}`})
    ctx.request.session.carritoID = carritoID;
    ctx.response.redirect(`carrito/${carritoID}/productos`)
  }else{
    ctx.response.redirect('api/users/login')
  }
}

const addProductToCart = async (ctx) => {
  const carritoID = ctx.request.params.id;
  const error = []
  const productoReq = ctx.request.body;
  const carritoElegido = await cartsDao.getById(carritoID);
  const producto = await productsDao.getById(productoReq.id)
  const productsList = []
  let cantidadReq = parseInt(productoReq.quantity)
  if( isNaN(cantidadReq) || cantidadReq === null) cantidadReq=1;
  productsList.push(...carritoElegido.products)

  const prodRepetido = await productsList.find(prod => prod.id === producto.id )
  const filtroIndex = await productsList.findIndex(prod => prod.id === producto.id);
  
  
  if(prodRepetido && filtroIndex >= 0){
      console.log('repetido');
      productsList[filtroIndex].quantity += cantidadReq;
      if (productsList[filtroIndex].quantity > productsList[filtroIndex].stock){
          productsList[filtroIndex].quantity = productsList[filtroIndex].stock
      }
  }else{
    console.log('no repetido');

      let productoACargar = {...producto,quantity:cantidadReq}
      productsList.push(productoACargar)
  }
  
  if (carritoElegido===undefined){
      ctx.response.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
  }else{
      await cartsDao.agregarProductos(carritoID,productsList);
  }
      
    const carritoActualizado = await cartsDao.getCarrito(carritoID);
  if(error.length!==0){
    logger.info({
        message: 'Se ha modificado el carrito',
        data: carritoActualizado,
        error: error
    })
  }else{
    logger.info({
        message: 'Se ha modificado el carrito',
        data: carritoActualizado
    })
  }
    ctx.response.redirect(`/api/carrito/${carritoID}/productos`)
  }

const getCartProducts = async (ctx) => {
    try{
        const carritoID = ctx.request.params.id;
        const carritoElegido = await cartsDao.getById(carritoID);
        const productList = await productsDao.getAll();
        const idMongo = ctx.request.session && ctx.request.session.idMongo;
        const usuario = await usersDao.getById(idMongo);

        console.log('user getCartProducts', usuario);

        let precioFinal = 0;
        carritoElegido.products.forEach( (producto) => {
            let subTotal = producto.quantity * producto.price
            precioFinal += subTotal;
        });
      
        if (carritoElegido===undefined){
            ctx.response.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingresponsee otro ID`});
        }else{
            ctx.response.render(path.join(process.cwd(), '/views/pages/cartView.ejs'), {usuario, cart: carritoElegido, cartID: carritoID, productsList: productList, precioFinal})
      
        }
    }catch(err){console.error('error:',err);}
}

const removeCart = async (ctx) => {
  const carritoID = ctx.request.params.id;
  const carritoElegido = await cartsDao.getCarrito(carritoID);
  if (carritoElegido===undefined){
      ctx.response.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
  }else{
      await cartsDao.vaciarCarrito(carritoID);
      ctx.response.send({message: `Se ha vaciado el carrito ID ${carritoID}`})
  }
}

const removeCartProduct = async (ctx) => {
  const carritoID = ctx.request.params.id;
  const productoID = ctx.request.params.id_prod;
  const producto = await productsDao.getById(productoID);
  const carritoElegido = await cartsDao.getCarrito(carritoID);
  if(producto===null){
    ctx.response.send({error: -3, descripcion: `el producto ID ${productoID} no existe ingrese otro ID`});
  }else if (carritoElegido===undefined){
    ctx.response.send({error: -4, descripcion: `el carrito ID ${carritoID} no existe ingrese otro ID`});
  }else{
      const eliminado =  await cartsDao.borrarItem(carritoID, productoID);
      if(eliminado){
        ctx.response.send({message: `Se ha eliminado el producto ID ${productoID} del carrito ID ${carritoID}`})
      }else{
        ctx.response.send({error: -3, descripcion: `el producto ID ${productoID} no existe en el carrito ID ${carritoID}`});
      }
  }
}

const mekeTicket = async ( ctx ) => {
  const carritoID = ctx.request.params.id;
  const carritoElegido = await cartsDao.getById(carritoID);
  const idMongo = ctx.request.session && ctx.request.session.idMongo;
  const usuario = await usersDao.getById(idMongo);

  let precioFinal = 0;
  carritoElegido.products.forEach( (producto) => {
      let subTotal = producto.quantity * producto.price
      precioFinal += subTotal;
  });
  const cartList = {cart: carritoElegido}
  
  let ticketCompra = {...usuario,...cartList};
  let htmlItems = '';
  const ticketId = await ticketsDao.createTicket(ticketCompra)

  for (const product of ticketCompra.cart.products) {
      let cadenaString = `   <div class="cartItemsTexts">
      <p>${product.title}</p>
      <p>Cantidad: ${product.quantity}</p>
      <p>Valor por unidad: $${product.price}</p>
      <p>Subtotal: $${product.price * product.quantity}</p>
    </div>`;
    htmlItems+=cadenaString;
  }

  const html = `<h2>Felicitaciones ${usuario.username}, ha finalizado su compra</h2>
  <p>El número de referencia es ${ticketId}</p>
  ${htmlItems}
  <p class="cartValorTotal">Total: $${precioFinal}</p>
  `
  const cuerpoWhatsapp = {
      body: `Felicitaciones ${usuario.username}, ha finalizado su compra.El número de referencia es ${ticketId}`,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:+${usuario.phone}`
  }
  sendMessage(cuerpoWhatsapp)
  transporter.sendMail(cartTicketMailOptions(usuario.photo , usuario.email , html), ( err , info ) => {
      if(err) {
        logger.error(err);
        return err
      }
      logger.info(info);
    })
  await cartsDao.deleteById(carritoID)
  

  ctx.response.render(path.join(process.cwd(), '/views/pages/cartBuy.ejs'), { cartTicket: ticketCompra, ticketId: ticketId, precioFinal})

}

export default {
    getAll,
    addProductToCart,
    createCart,
    getCartProducts,
    removeCart,
    removeCartProduct,
    mekeTicket
}
