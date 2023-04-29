// define doctorAppointments function

const DOCTOR = require("../models/doctor");
const APPOINTMENT = require("../models/appointment");

async function doctorAvailableAppointments(req, res, next) {
  try {
    //find doctor by id
    //if not found
    //throw error
    const doctor = await DOCTOR.findById(req.params.ID);
    if (!doctor) {
      throw new createError(`Couldn't find doctor by id ${req.params.ID}`);
    }

    //list all available appointments for a doctor
    //within doctor work hours
    //into half-hour slots
    //exclude preserved appointments
    //return list of available dates not booked
    const appointments = await APPOINTMENT.find({
      doctor: req.params.ID,
      state: "waiting",
    })
      .select("date")
      .sort("date");
    const availableAppointments = [];
    const now = new Date();
    //@param hours — Must be supplied if minutes is supplied.
    //A number from 0 to 23 (midnight to 11pm) that specifies the hour.

    //TODO:may doctor work from a day to second day

    const from = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      doctor.workHours.from,
      0,
      0
    );
    const to = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      doctor.workHours.to,
      0,
      0
    );

    const interval = 30 * 60 * 1000;
    for (let i = from; i <= to; i = new Date(i.getTime() + interval)) {
      const appointment = appointments.find(
        (appointment) => appointment.date.getTime() === i.getTime()
      );
      if (!appointment) {
        availableAppointments.push(i);
      }
    }
    req.res_object = {
      message: `successfully get available appointments`,
      success: true,
      result: availableAppointments,
      notify: true,
    };
    next();
  } catch (error) {
    next(error);
  }
}

//export doctorAppointments function
module.exports = { doctorAvailableAppointments };
