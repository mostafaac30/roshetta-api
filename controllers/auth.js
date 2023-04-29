const DOCTOR = require("../models/doctor");
const PATIENT = require("../models/patient");
const { comparePassword } = require("../utils/password");
const { createGlobalToken, verifyGlobalToken } = require("../utils/jwt");
const createError = require("http-errors");

async function signUp(req, res, next) {
  try {
    const { body } = req;
    const { type, email, password, name } = body;
    if (type === "doctor") {
      const doctor = await DOCTOR.create({ name, email, password });
      const token = createGlobalToken(doctor._id);
      //add token to doctor

      const res_object = {
        message: `successfully signup doctor ${doctor.name} `,
        success: true,
        token: token,
        results: [doctor],
        notify: true,
      };
      req.res_object = res_object;
      next();
    } else {
      const patient = await PATIENT.create({ name, email, password });
      const token = createGlobalToken(patient._id);
      const res_object = {
        message: `successfully signup patient ${patient.name} `,
        success: true,
        token: token,
        result: [patient],
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
      throw new createError(
        "parameter missed,please enter all required fields "
      );
    if (type === "doctor") {
      const doctor = await DOCTOR.findOne({ email: email });
      if (!doctor)
        throw new createError(`Couldn't find doctor by email ${email}`);

      if (doctor.banned) {
        const deletedError = new createError(
          "you are banned from the platform"
        );
        deletedError.code = 403;
        throw deletedError;
      }

      if (comparePassword(password, doctor.password)) {
        const token = createGlobalToken(doctor._id);

        const res_object = {
          message: `successfully signing`,
          success: true,
          token: token,
          result: [doctor],
          notify: true,
        };
        req.res_object = res_object;
        return next();
      }
      throw new createError("email or password incorrect");
    }
    if (type === "patient") {
      const patient = await PATIENT.findOne({ email: email });
      if (!patient)
        throw new createError(`Couldn't find patient by email ${email}`);
      if (patient.banned) {
        const deletedError = new createError(
          "you are banned from the platform"
        );
        deletedError.code = 403;
        throw deletedError;
      }

      if (comparePassword(password, patient.password)) {
        const token = createGlobalToken(patient._id);

        const res_object = {
          message: `successfully signing`,
          success: true,
          token: token,
          result: [patient],
          notify: true,
        };
        req.res_object = res_object;
        return next();
      }
      throw new createError("email or password incorrect");
    }

    throw new createError(`Error has occurred maybe doesn't choose type  !`);
  } catch (error) {
    next(error);
  }
}

async function isSignedIn(req, res, next) {
  try {
    const { headers } = req;

    const token = headers["authorization"];
    if (!token) return next(createError(401, "no token provided"));
    const authToken = token.split(" ")[1];
    const verifiedObject = verifyGlobalToken(authToken);
    if (!verifiedObject) return next(createError(401, "invalid token"));
    const { id } = verifiedObject;

    const patient = PATIENT.findById(id);
    if (patient) {
      req.user = patient;
      console.log(patient, "user");
      return next();
    }
    const doctor = DOCTOR.findById(id);
    if (doctor) {
      req.user = doctor;
      console.log(doctor, "user");
      return next();
    }

    return next(createError(401, "no match for user"));
  } catch (e) {
    return next(createError(e));
  }
}

module.exports = {
  signUp,
  signIn,
  isSignedIn,
};
