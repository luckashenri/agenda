var cors = require('cors');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const employees = require('./routes/employees');
const services = require('./routes/services');
const schedules = require('./routes/schedules');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

app.use(cors());

// if (!config.get('jwtPrivateKey')) {
//   console.error('FATAL ERROR: JWT is not defined!');
//   process.exit(1);
// }

// export agenda_jwtPrivateKey="privateKey"

mongoose.connect('mongodb://localhost/github-agenda', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => 'Connected to the database').catch((err) => console.log('err', err));

app.use(express.json());
app.use('/api/employees', employees);
app.use('/api/services', services);
app.use('/api/schedules', schedules);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listen on port ${port}...`));