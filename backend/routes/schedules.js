const { Schedule, validate } = require('../models/schedule');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');

router.get('/', async (req, res) => {
  const schedules = await Schedule.find();
  res.send(schedules);
});

router.get('/:start&:end', async (req, res) => {

  try {
    const schedules = await Schedule.find({ date: {
      $gte: req.params.start,
      $lt: req.params.end
    }});

    res.send(schedules);
  
  } catch (error) {
      res.status(400).send(error.message);
  }
});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //TODO Add validation to check if already exists schedule on this date

  const schedule = new Schedule(_.pick(req.body, ['service', 'date', 'note', 'client']));

  await schedule.save();
  res.send(schedule);
});

module.exports = router;