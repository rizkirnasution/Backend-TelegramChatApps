const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const authModel = require('../models/auth');
const userModel = require('../models/user');
const jwtToken = require('../utils/generateJwtToken');
const { success, failed } = require('../utils/createResponse');

module.exports = {
  register: async (req, res) => {
    try {
      const user = await userModel.findBy('email', req.body.email);
      if (user.rowCount) {
        failed(res, {
          code: 409,
          payload: 'Email already exist',
          message: 'Register Failed',
        });
        return;
      }

      const { username, email, password } = req.body;
      const salt = bcrypt.genSaltSync(10)
      const passwordHash = bcrypt.hashSync(password, 10)
      // const token = crypto.randomBytes(30).toString('hex');

      await authModel.register({
        id: uuidv4(),
        username,
        email,
        password: passwordHash,
        date: new Date(),
      });

      // await authModel.updateToken(insertData.rows[0].id, token);

      // // send email for activate account
      // const templateEmail = {
      //   from: `"${APP_NAME}" <${EMAIL_FROM}>`,
      //   to: req.body.email.toLowerCase(),
      //   subject: 'Activate Your Account!',
      //   html: activateAccountEmail(`${API_URL}/auth/activation/${token}`),
      // };
      // sendEmail(templateEmail);

      success(res, {
        code: 201,
        payload: null,
        message: 'Register Success',
      });
    } catch (error) {
      console.log(error)
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findBy('email', email);

      // jika user ditemukan
      if (user.rowCount > 0) {
        const match = await bcrypt.compare(password, user.rows[0].password);
        // jika password benar
        if (match) {
          const jwt = await jwtToken({
            id: user.rows[0].id,
          });
          success(res, {
            code: 200,
            payload: null,
            message: 'Login Success',
            token: {
              jwt,
              id: user.rows[0].id,
            },
          });
          return;
        }
      }

      failed(res, {
        code: 401,
        payload: 'Wrong Email or Password',
        message: 'Login Failed',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
};
