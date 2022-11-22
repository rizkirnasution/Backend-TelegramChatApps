const { validationResult } = require('express-validator');
const { failed } = require('../utils/createResponse');

module.exports = (req, res, next) => {
  try {
    const errors = validationResult(req).array({ onlyFirstError: true });

    // jika validasi gagal
    if (errors.length) {
      failed(res, {
        code: 400,
        payload: errors,
        message: 'Validation Failed',
      });
      return;
    }

    next();
  } catch (error) {
    failed(res, {
      code: 500,
      payload: error.message,
      message: 'Internal Server Error',
    });
  }
};
