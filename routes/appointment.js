var express = require("express");
const APP = require("../models/appointment");
const model = require("../controllers/model");
const CATEGORY = require("../models/category");
const DOCTOR = require("../models/doctor");
const PATIENT = require("../models/patient");
const { response } = require("../utils/res");
const { errorHandler } = require("../utils/error");
const { stats } = require("../controllers/stats");
const { Router } = express;
var router = Router();
const modelPath = "/appointment";
const modalName = "appointment";
const { get, getOne, remove, edit, create } = model;

async function randomAppointment(req, res, next) {
  try {
    const { body } = req;
    const { category, patient, date, online } = body;
    const doctors = await DOCTOR.find({ category: category }).limit(10).exec();
    if (!doctors && !doctors.length)
      throw new Error(`Could not find any doctors for ${category}`);
    if (!patient && !(await PATIENT.isExist(patient)))
      throw new Error(` no Patient found`);
    const doctorIndex = Math.floor(Math.random() * doctors.length);
    const doctor = doctors[doctorIndex];
    const appointment = await APP.create({
      doctor: doctor._id,
      patient: patient,
      cost: doctor.AppointmentCost,
      date,
      online,
    });
    const res_object = {
      message: "successfully data retrieved",
      success: true,
      result: appointment,
      notify: false,
    };
    req.res_object = res_object;
    next();
  } catch (err) {
    next(err);
  }
}

router.get(
  modelPath,
  (req, res, next) => {
    (req.Model = APP), (req.model_name = modalName);
    console.log(req.Model, req.model_name);
    next();
  },
  get,
  response
);
router.post(
  modelPath,
  (req, res, next) => {
    (req.Model = APP), (req.model_name = modalName);
    next();
  },
  create,
  response
);
router.put(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = APP), (req.model_name = modalName);
    next();
  },
  edit,
  response
);

router.delete(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = APP), (req.model_name = modalName);
    next();
  },
  remove,
  response
);

router.get(
  modelPath + "/:ID",
  (req, res, next) => {
    (req.Model = APP), (req.model_name = modalName);
    next();
  },
  getOne,
  response
);
router.get(
  modelPath + "-stats",
  (req, res, next) => {
    (req.Model = APP), (req.model_name = modalName);
    next();
  },
  stats,
  response
);
router.post(
  modelPath + "-random",
  (req, res, next) => {
    (req.Model = APP), (req.model_name = modalName);
    next();
  },
  randomAppointment,
  response
);
module.exports = router;
