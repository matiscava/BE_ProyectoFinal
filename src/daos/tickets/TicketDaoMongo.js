import { Schema } from 'mongoose';

import MongoContainer from "../../containers/MongoContainer.js";

class TicketsDaoMongo extends MongoContainer {
  constructor() {
    super('tickets', new Schema({
      username: {type: String, required: true},
      name: {type: String, required: true},
      lastname: {type: String, required: true},
      email: {type: String, required: true},
      photo: {type: String, required: true},
      phone: {type: Number, required: true},
      userId:{type: String, required: true},
      cart: {type: Array, required:true}
    }))
  }
};

export default TicketsDaoMongo;