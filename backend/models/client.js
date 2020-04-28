const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50
  },
  phone: {
    type: String,
    min: 5,
    max: 50
  },
  email: {
    type: String,
    min: 5,
    max: 255
  }
})

clientSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin, name: this.name }, config.get('jwtPrivateKey')); 
};

const Client = mongoose.model('Client', clientSchema);

function validateClient(client) {
  const schema = {
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().email().min(5).max(255),
    phone: Joi.string().min(5).max(50)
  };
  return Joi.validate(client, schema);
}

exports.Client = Client;
exports.validate = validateClient;
