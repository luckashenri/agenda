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

router.put('/:id', auth, async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const employee = await Employee.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      phone: req.body.phone
    }, { new: true });

  if (!employee) return res.status(404).send('The employee with the given ID was not found.');
  
  res.send(employee);
});

router.delete('/:id', async (req, res) => {
  const employee = await Employee.findByIdAndRemove(req.params.id);

  if (!employee) return res.status(404).send('The employee with the given ID was not found.');

  res.send(employee);
});

module.exports = router;