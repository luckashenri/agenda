const config = require('config');
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email});
  if (!user) return res.status(400).send('Invalid email or password');
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();

  user = _.pick(user, ['_id', 'name']);
  res.send({token, user});
});

function validate(req) {
  const schema = {
    email: Joi.string().required().email().min(5).max(255),
    password: Joi.string().required().min(5).max(255)
  };
  return Joi.validate(req, schema);
}

module.exports = router;