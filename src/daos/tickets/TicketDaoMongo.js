const { Schema } = require('mongoose');

const MongoContainer = require("../../containers/MongoContainer");

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

module.exports = TicketsDaoMongo;