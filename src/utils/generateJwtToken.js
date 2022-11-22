const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./env');

module.exports = async (payload) => {
  const token = await jwt.sign(payload, JWT_SECRET, {
    expiresIn: 3600 * 6,
  });

  return token;
};
