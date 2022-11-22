const db = require('../config/db');

module.exports = {
  selectAll: (paging, search = '') => new Promise((resolve, reject) => {
    console.log(search);
    db.query(
      'SELECT * FROM users WHERE LOWER(username) LIKE \'%\'||LOWER($1)||\'%\'',
      [search],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  findBy: (field, search) => new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE ${field}=$1`,
      [search],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  updateById: (id, body) => new Promise((resolve, reject) => {
    const { username, phone, bio } = body;

    db.query(
      'UPDATE users SET username=$1, phone=$2, bio=$3 WHERE id=$4',
      [username, phone, bio, id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  changePhoto: (id, photo) => new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET photo=$1 WHERE id=$2',
      [photo, id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      },
    );
  }),
  countAll: () => new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) FROM users', (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  }),
};
