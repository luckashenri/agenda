const { Employee, validate } = require('../models/employee');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');

router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.send(employees);
});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const employee = new Employee(_.pick(req.body, ['name', 'phone']));

  await employee.save();
  res.send(employee);
});

module.exports = router;