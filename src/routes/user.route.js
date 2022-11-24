const express = require('express');
const validation = require('../validations/user.validation');
const upload = require('../middlewares/upload');
const photoLimit = require('../middlewares/photoLimit');
const {
  list, detail, updatePhoto, updateProfile,
} = require('../controllers/user');

const router = express.Router();

router
  .get('/user', list)
  .get('/user/:id',  detail)
  .put('/user/:id',  validation.updateProfile, updateProfile)
  .put('/user/:id/photo',  upload, photoLimit, updatePhoto);

module.exports = router;
