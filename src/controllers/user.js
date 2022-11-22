const userModel = require('../models/user');
const createPagination = require('../utils/createPagination');
const { success, failed } = require('../utils/createResponse');
const uploadGoogleDrive = require('../utils/uploadGoogleDrive');
const deleteGoogleDrive = require('../utils/deleteGoogleDrive');
const deleteFile = require('../utils/deleteFile');

module.exports = {
  list: async (req, res) => {
    try {
      const { search, page, limit } = req.query;
      const count = await userModel.countAll();
      const paging = createPagination(count.rows[0].count, page, limit);
      const users = await userModel.selectAll(paging, search);

      success(res, {
        code: 200,
        payload: users.rows,
        message: 'Select List User Success',
        // pagination: paging.response,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findBy('id', id);

      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: 'Select Detail User Failed',
        });
        return;
      }

      success(res, {
        code: 200,
        payload: user.rows[0],
        message: 'Select Detail User Success',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.findBy('id', id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: 'Update User Failed',
        });
        return;
      }

      await userModel.updateById(id, req.body);

      success(res, {
        code: 200,
        payload: null,
        message: 'Update User Success',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  updatePhoto: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.findBy('id', id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        // hapus jika ada upload photo
        if (req.files) {
          if (req.files.photo) {
            deleteFile(req.files.photo[0].path);
          }
        }

        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: 'Update User Photo Failed',
        });
        return;
      }

      let { photo } = user.rows[0];
      // jika ada upload photo
      console.log('data potho',photo)
      console.log(user.rows[0])
      console.log(req.files)
      if (req.files) {
        if (req.files.photo) {
          // menghapus photo sebelumnya di gd jika sebelumnya sudah pernah upload
          console.log(req.files.photo)
          if (user.rows[0].photo) {
            await deleteGoogleDrive(user.rows[0].photo);
          }
          // upload photo baru ke gd
          photo = await uploadGoogleDrive(req.files.photo[0]);
          // menghapus photo setelah diupload ke gd
          deleteFile(req.files.photo[0].path);
        }
      }

      await userModel.changePhoto(user.rows[0].id, photo.id);
      console.log(photo)
      success(res, {
        code: 200,
        payload: null,
        message: 'Update User Photo Success',
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
