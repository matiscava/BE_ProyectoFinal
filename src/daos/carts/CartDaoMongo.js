const { Schema } = require('mongoose');

const MongoContainer = require("./../../containers/MongoContainer");

class CartDaoMongo extends MongoContainer {
  constructor() {
    super('carts', new Schema({
      timestamp: {type: String, required: true},
      products: {type: Array, required:true}
    }))
  }
};

module.exports = CartDaoMongo;