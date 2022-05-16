const multer = require("multer");
const moment = require("moment");
const path = require("path");
const { imageError } = require("./apiError");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, moment() + "--" + file.originalname);
  },
});
const imageUpload = multer({
  storage: fileStorage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|svg|png|gif/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      return cb(JSON.stringify(imageError));
    }
  },
});

module.exports = imageUpload;
