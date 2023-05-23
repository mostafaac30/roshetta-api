var express = require("express");
const PATIENT = require("../models/patient");
const model = require("../controllers/model");
const { stats } = require("../controllers/stats");
const { response } = require("../utils/res");
const { errorHandler } = require("../utils/error");
const { Router } = express;
var router = Router();
const modelPath = "/patient";
const modalName = "patient";
const { get, getOne, remove, edit, create } = model;
const { editUserInfo } = require("../controllers/user");
const { upload } = require("../utils/fileUploader");

router.get(
  modelPath,
  (req, res, next) => {
    (req.Model = PATIENT), (req.model_name = modalName);
    console.log(req.Model, req.model_name);
    next();
  },
  get,
  response
);
router.post(
  modelPath,
  (req, res, next) => {
    (req.Model = PATIENT), (req.model_name = modalName);
    next();
  },
  create,
  response
);
router.put(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = PATIENT), (req.model_name = modalName);
    next();
  },
  upload.any("image"),

  editUserInfo,

  response
);

router.delete(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = PATIENT), (req.model_name = modalName);
    next();
  },
  remove,
  response
);

router.get(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = PATIENT), (req.model_name = modalName);
    next();
  },
  getOne,
  response
);
router.get(
  modelPath + "-stats",
  (req, res, next) => {
    (req.Model = PATIENT), (req.model_name = "patient");
    next();
  },
  stats,
  response
);

module.exports = router;
