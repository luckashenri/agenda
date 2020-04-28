const Joi = require('joi');
const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

function validateEmployee(employee) {
  const schema = {
    name: Joi.string().required().min(5).max(50),
    phone: Joi.string().min(5).max(50).required()
  };
  return Joi.validate(employee, schema);
}

exports.Employee = Employee;
exports.validate = validateEmployee;
