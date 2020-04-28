const { Service, validate } = require('../models/service');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');

router.get('/', async (req, res) => {
  const services = await Service.find();
  res.send(services);
});

router.post('/', [auth, admin], async (req, res) => {
  console.log('req', req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const service = new Service(_.pick(req.body, ['name']));

  await service.save();
  res.send(service);
});

module.exports = router;