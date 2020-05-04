const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    min: 5,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024
  },
  isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function() {
  // return jwt.sign({ _id: this._id, isAdmin: this.isAdmin, name: this.name }, config.get('jwtPrivateKey'));
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin, name: this.name }, 'ForDevPurposesOnly');
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().email().min(5).max(255),
    password: Joi.string().required().min(5).max(255),
    isAdmin: Joi.bool()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
