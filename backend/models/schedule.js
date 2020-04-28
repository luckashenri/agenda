const Joi = require('joi');
const mongoose = require('mongoose');
const serviceSchema = require('../models/service');
const clientSchema = require('../models/client');

const scheduleSchema = mongoose.Schema({
  service: {
    type: serviceSchema,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  note: String,
  client: {
    type: clientSchema
  }
})

const Schedule = mongoose.model('Schedule', scheduleSchema);

function validateSchedule(schedule) {
  const schema = {
    service: Joi.objectId().required(),
    client: Joi.object().required(),
    note: Joi.string(),
    date: Joi.date().required()
  };
  return Joi.validate(schedule, schema);
}

exports.Schedule = Schedule;
exports.validate = validateSchedule;
