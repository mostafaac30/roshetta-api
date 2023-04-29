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
  edit,
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
module.exports = router;
