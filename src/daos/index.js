const ProductDaoMongo = require('./products/ProductDaoMongo');
const ProductDaoMemory = require('./products/ProductDaoMemory');
const ProductDaoFirestore = require('./products/ProductDaoFirestore');
const ProductDaoFile = require('./products/ProductDaoFile');

const daos = {};
// si setamos mongo vamos a exportar los daos de mongo
if (process.env.storage === 'mongodb') {
  daos['productDao'] = ProductDaoMongo;
  console.log('Se conecto a mongo');

}

// si setamos memoria vamos a exportar los daos de memoria
if (process.env.storage === 'memory') {
  daos['productDao'] = ProductDaoMemory;
  console.log('Se conecto a la memoria');

}

// si setamos firestore vamos a exportar los daos de firestore
if (process.env.storage === 'firestore') {
  daos['productDao'] = ProductDaoFirestore;
  console.log('Se conecto al firestore');

}

// si setamos archivo vamos a exportar los daos de archivo
if (process.env.storage === 'file') {
  daos['productDao'] = ProductDaoFile;
  console.log('Se conecto al file');

}

module.exports = daos;