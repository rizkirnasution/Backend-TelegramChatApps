const express = require('express');
const validation = require('../validations/auth.validation');
const runValidation = require('../middlewares/runValidation');
const {
  register,
  login,
} = require('../controllers/auth');

const router = express.Router();

router
  .post('/auth/register',  register)
  .post('/auth/login', login);

module.exports = router;
