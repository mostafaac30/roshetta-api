var express = require("express");
const DOCTOR = require("../models/doctor");
const model = require("../controllers/model");
const { stats } = require("../controllers/stats");

const { response } = require("../utils/res");
const { errorHandler } = require("../utils/error");
const { Router } = express;
var router = Router();
const modelPath = "/doctor";
const { get, getOne, remove, edit, create } = model;
const { doctorAvailableAppointments } = require("../controllers/doctor");
const { editUserInfo } = require("../controllers/user");
const { upload } = require("../utils/fileUploader");

router.get(
  modelPath,
  (req, res, next) => {
    (req.Model = DOCTOR), (req.model_name = "doctor");
    console.log(req.Model, req.model_name);
    next();
  },
  get,
  response
);
router.post(
  modelPath,
  (req, res, next) => {
    (req.Model = DOCTOR), (req.model_name = "doctor");
    next();
  },
  create,
  response
);
router.put(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = DOCTOR), (req.model_name = "doctor");
    next();
  },
  upload.any("image"),

  editUserInfo,
  response
);

router.delete(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = DOCTOR), (req.model_name = "doctor");
    next();
  },
  remove,
  response
);

router.get(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = DOCTOR), (req.model_name = "doctor");
    next();
  },
  getOne,
  response
);
router.get(
  modelPath + "-stats",
  (req, res, next) => {
    (req.Model = DOCTOR), (req.model_name = "doctor");
    next();
  },
  stats,
  response
);

router.get(
  modelPath + "-appointments/:ID",
  (req, res, next) => {
    (req.Model = DOCTOR), (req.model_name = "doctor");
    next();
  },
  doctorAvailableAppointments,
  response
);

module.exports = router;
