const Joi = require('joi');
const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50
  }
});

const Service = mongoose.model('Service', serviceSchema);

function validateService(service) {
  const schema = {
    name: Joi.string().required().min(5).max(50)
  };
  return Joi.validate(service, schema);
}

exports.Service = Service;
exports.validate = validateService;
