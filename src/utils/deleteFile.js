const fs = require('fs');

module.exports = (path) => {
  // cek apakah file exist
  if (fs.existsSync(path)) {
    // delete file
    fs.unlinkSync(path);
  }
};
