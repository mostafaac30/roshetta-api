const express = require("express");
const { Router } = express;
const router = Router();
const Seed = require("../controllers/seed");
const final = require("../controllers/final").final;

router.post("/doctor", Seed.doctorSeed, final);
router.post("/patient", Seed.patientSeed, final);
router.post("/appointment", Seed.appointmentSeed, final);
router.post("/category", Seed.categorySeed, final);

module.exports = router;
