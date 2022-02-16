import { Schema } from 'mongoose';

import MongoContainer from "./../../containers/MongoContainer.js";

class CartDaoMongo extends MongoContainer {
  constructor() {
    super('carts', new Schema({
      timestamp: {type: String, required: true},
      products: {type: Array, required:true}
    }))
  }
};

export default CartDaoMongo;