var express = require("express");
const CATEGORY = require("../models/category");
const model = require("../controllers/model");
const { response } = require("../utils/res");
const { errorHandler } = require("../utils/error");
const { Router } = express;
var router = Router();
const modelPath = "/category";
const modalName = "category";
const { get, getOne, remove, edit, create } = model;
router.get(
  modelPath,
  (req, res, next) => {
    (req.Model = CATEGORY), (req.model_name = modalName);
    console.log(req.Model, req.model_name);
    next();
  },
  get,
  response
);
router.post(
  modelPath,
  (req, res, next) => {
    (req.Model = CATEGORY), (req.model_name = modalName);
    next();
  },
  create,
  response
);
router.put(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = CATEGORY), (req.model_name = modalName);
    next();
  },
  edit,
  response
);

router.delete(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = CATEGORY), (req.model_name = modalName);
    next();
  },
  remove,
  response
);

router.get(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = CATEGORY), (req.model_name = modalName);
    next();
  },
  getOne,
  response
);

module.exports = router;
