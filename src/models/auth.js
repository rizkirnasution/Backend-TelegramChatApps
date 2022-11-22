const db = require('../config/db');

module.exports = {
  register: (body) => new Promise((resolve, reject) => {
    const {
      id,
      username,
      email,
      password,
      date,
    } = body;

    db.query(
      'INSERT INTO users (id, username, email, password, date) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [id, username, email, password, date],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  updateToken: (id, token) => new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET email_token=$1 WHERE id=$2',
      [token, id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  activateEmail: (id) => new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET is_verified=true WHERE id=$1',
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
};
