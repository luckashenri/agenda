const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('Authentication');
  if (!token) return res.status(401).send('Access denied!. No token provided.');

  try {
    // const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    const decoded = jwt.verify(token, 'ForDevPurposesOnly');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}