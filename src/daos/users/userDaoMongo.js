const { Schema } = require('mongoose');

const MongoContainer = require("../../containers/MongoContainer");

class UserDaoMongo extends MongoContainer {
  constructor() {
    super('users', new Schema({
        username: {type: String, required:true},
        name: {type: String, required:true},
        lastname: {type: String, required:true},
        email: {type: String, required:true},
        password: {type: String, required:true},
        photo: { type: String, default: "https://static.diariosur.es/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--320x378.jpg" },
        phone: { type: Number, required: true },
        admin: {type: Boolean, default: false}
      }))
  }
};

module.exports = UserDaoMongo;