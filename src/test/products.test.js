import axios from 'axios';

const API_URL = 'http://localhost:8080';
const API_PRODUCTS = `${API_URL}/api/products`;
const productID = '6213a9a4cb075c1620270c67';
// '6213a9a4cb075c1620270c67'
// '6213a95e1b69e2cad9c97d94'

const API_PRODUCT_ID = `${API_PRODUCTS}/${productID}`

// axios.get(API_PRODUCTS)
// .then( ({ data }) => console.log(data) )
// .catch( ({ message }) => console.error(`Error: ${message}`) )

//Para que funcione se debe comentar el if(usuario.admin) que esta en el controlador product.js

// axios.post(API_PRODUCTS,{
//   title: 'producto inventado en test',
//   description: 'descripcion de producto inventado en test',
//   stock: 99,
//   price: 111,
//   photo: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/091/377/products/condensador-de-flujo-volver-al-futuro1-00bd54536b25bf27ae16021060798552-1024-1024.png'
// })
// .then( ({ data }) => console.log(data) )
// .catch( ({ message }) => console.error(`Error: ${message}`) )

axios.put(API_PRODUCT_ID,{
  price: 20,
  stock: 1,
  title: "producto modificado en test"
})
.then( ({ data }) => console.log(data) )
.catch( ({ message }) => console.error(`Error: ${message}`) )


// axios.delete(API_PRODUCT_ID)
// .then( ({ data }) => console.log(data) )
// .catch( ({ message }) => console.error(`Error: ${message}`) )

