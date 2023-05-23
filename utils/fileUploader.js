const multer = require("multer");
const path = require("path");
const fs = require("fs");
const config = require("./config");
const imagesPath = config.upload;
const videoPath = config.upload + "/videos";
const audioPath = config.upload + "/audio";
const { makeToken } = require("./jwt");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const extensionName = path.extname(file.originalname.toLowerCase());
    checkTypes(extensionName, cb);
  },
  filename: function (req, file, cb) {
    const token = uuid.v4();
    cb(null, token + "-" + file.originalname);
  },
});

exports.upload = multer({
  fileFilter: function (req, file, cb) {
    const extensionName = path.extname(file.originalname.toLowerCase());
    if (filters(extensionName)) cb(null, true);
    else cb(null, false);
  },
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 50mb max
});

function checkTypes(extname, cb) {
  if (
    extname == ".png" ||
    extname == ".jpg" ||
    extname == ".jpeg" ||
    extname == ".gif" ||
    extname == ".pdf" ||
    extname == ".svg"
  ) {
    checkFolders(imagesPath);
    cb(null, imagesPath);
  } else cb(new Error("Unknown or Unsupported file to upload " + extname));
}

function checkFolders(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
}

function filters(extname) {
  const isValidType =
    extname == ".png" ||
    extname == ".jpg" ||
    extname == ".jpeg" ||
    extname == ".pdf" ||
    extname == ".svg";
  return isValidType;
}
