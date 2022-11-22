const { check } = require('express-validator');

const updateProfile = [
  // username
  check('username', 'Username required').not().isEmpty(),
  check('username', 'Username only can contains alphabet').isAlpha('en-US', {
    ignore: ' ',
  }),
  check('username', 'Username maximum length is 100 characters').isLength({ max: 100 }),
  // phone
  check('phone', 'Phone only can contains number').isNumeric(),
  check('phone', 'Phone maximum length is 13 characters').isLength({ max: 13 }),
  // bio
  check('bio', 'Bio only can contains number').isLength({ max: 500 }),
];

module.exports = {
  updateProfile,
};
