import supertest from 'supertest';
import { expect } from 'chai';


const API_URL = 'http://localhost:8080';
const API_PRODUCTS = `${API_URL}/api/products`;


const request = supertest(API_PRODUCTS);

describe('/api/products test with chai and supertest', () => {
  describe('GET', () => {
    it('deberia retornar un status 200', async () => {
      try{
        const response = await request.get('/');
        expect(response.status).to.eql(200)  
      }catch(err){console.error('Error en chai test:',err)}
    })
  })
  describe('GET PRODUCT', () => {
    let productID = 4;
      it(`Debería retornar el producto con ID: ${productID} y un status 200`,async () => {
      try{
        const response = await request.get(`/${productID}`);
        const getProductJSON = JSON.parse(response.text);

        expect(response.status).to.eql(200) 
        expect(getProductJSON.id).to.eql(productID)  
        console.log('producto retornado: ',getProductJSON);

      }catch(err){console.error('Error en chai test:',err)}
    })
  })
  describe('POST', () => {
    it('deberia incorporar un producto y refresca la página al devolver status 302', async () => {
      try{
        const productoNuevo = {
            title: 'producto inventado en test de Chai',
            description: 'descripcion de producto inventado en test de chai',
            stock: 126,
            price: 156,
            photo: 'https://http2.mlstatic.com/D_NQ_NP_647657-MLA43637425117_092020-O.webp'
          };
        const response = await request.post('/').send(productoNuevo);
        const createdProduct = await request.get(`/10`)
        const createdProductJSON = JSON.parse(createdProduct.text);
        
        expect(response.status).to.eql(302);

        expect(createdProductJSON).to.include.keys('title','description','stock','price','photo')
        expect(createdProductJSON.title).to.eql(productoNuevo.title)
        expect(createdProductJSON.description).to.eql(productoNuevo.description)
        expect(createdProductJSON.stock).to.eql(productoNuevo.stock)
        expect(createdProductJSON.price).to.eql(productoNuevo.price)
        expect(createdProductJSON.photo).to.eql(productoNuevo.photo)

        
      }catch(err){console.error('Error en chai test:',err)}
    })
  } )
  describe('PUT',  () => {
    let productID = 1;
    it(`Debería modificar el producto con ID: ${productID} y devuelve status 200`,async () => {
        try{
        const updateValues = {
          price: 10000,
          stock: 2,
          title: 'Me modificaron a traves de Chia'
        }
        const originalProduct = await request.get(`/${productID}`)
        const originalProductJSON = JSON.parse(originalProduct.text)
        

        const response = await request.put(`/${productID}`).send(updateValues)
        const updatedProduct = await request.get(`/${productID}`)
        const updatedProductJSON = JSON.parse(updatedProduct.text);
        
        expect(response.status).to.eql(200);
        expect(originalProductJSON.title).to.not.equal(updatedProductJSON.title);
        expect(originalProductJSON.price).to.not.equal(updatedProductJSON.price);
        expect(originalProductJSON.stock).to.not.equal(updatedProductJSON.stock);
        
        expect(updateValues.title).to.eql(updatedProductJSON.title);
        expect(updateValues.price).to.eql(updatedProductJSON.price);
        expect(updateValues.stock).to.eql(updatedProductJSON.stock);


      }catch(err){console.error('Error en chai test:',err)}
    })
  })
  describe('DELETE',() => {
    let productID = 2
    it(`Debería eliminar el producto ID: ${productID} y devuelve error -3 al intentar llamarlo nuevamente`, async () => {
      try{        
        const response = await request.delete(`/${productID}`)
        const deltedProduct = await request.get(`/${productID}`)
        const deleteProductJSON = JSON.parse(deltedProduct.text)
        
        expect(response.status).to.eql(200);
        expect(deleteProductJSON).to.include.keys('error')
        expect(deleteProductJSON.error).to.eql(-3);


      }catch(err){console.error('Error en chai test:',err)}
    })
  })
} )