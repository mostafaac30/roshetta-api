const DOCTOR = require("../models/doctor");
const PATIENT = require("../models/patient");
const { comparePassword } = require("../utils/password");
const { createToken } = require("../utils/jwt");
async function signUp(req, res, next) {
  try {
    const { body } = req;
    const { type, email, password, name } = body;
    if (type === "doctor") {
      const doctor = await DOCTOR.create({ name, email, password });
      const res_object = {
        message: `successfully signup doctor ${doctor.name} `,
        success: true,
        result: doctor,
        notify: true,
      };
      req.res_object = res_object;
      next();
    } else {
      const patient = await PATIENT.create({ name, email, password });
      const res_object = {
        message: `successfully signup patient ${patient.name} `,
        success: true,
        result: patient,
        notify: true,
      };
      req.res_object = res_object;
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function signIn(req, res, next) {
  try {
    const { body } = req;
    const { type, email, password, name } = body;
    if (!email || !password)
      throw new Error("parameter missed,please enter all required fields ");
    if (type === "doctor") {
      const doctor = await DOCTOR.findOne({ email: email });
      if (!doctor) throw new Error(`Couldn't find doctor by email ${email}`);

      if (doctor.banned) {
        const deletedError = new Error("you are banned from the platform");
        deletedError.code = 403;
        throw deletedError;
      }

      if (comparePassword(password, doctor.password)) {
        const createdToken = await createToken(doctor._id);

        const res_object = {
          message: `successfully signing`,
          success: true,
          results: [createdToken, doctor],
          notify: true,
        };
        req.res_object = res_object;
        return next();
      }
      throw new Error("email or password incorrect");
    }
    if (type === "patient") {
      const patient = await PATIENT.findOne({ email: email });
      if (!patient) throw new Error(`Couldn't find patient by email ${email}`);
      if (patient.banned) {
        const deletedError = new Error("you are banned from the platform");
        deletedError.code = 403;
        throw deletedError;
      }

      if (comparePassword(password, patient.password)) {
        const createdToken = await createToken(patient._id);

        const res_object = {
          message: `successfully signing`,
          success: true,
          results: [createdToken, patient],
          notify: true,
        };
        req.res_object = res_object;
        return next();
      }
      throw new Error("email or password incorrect");
    }

    throw new Error(`Error has occurred maybe doesn't choose type  !`);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp,
  signIn,
};
