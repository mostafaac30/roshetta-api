const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;
const CHAT = require("../models/chat");
const PATIENT = require("../models/patient");
const DOCTOR = require("../models/doctor");

const AppointmentSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    doctor: {
      type: Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    online: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      default: "waiting",
    },
    cost: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

AppointmentSchema.pre("save", handlePreAppointment);

AppointmentSchema.post("save", handleAppointment);
async function handleAppointment(doc) {
  if (doc.state !== "waiting") return;
  const chat = await CHAT.create({
    appointment: doc._id,
    doctor: doc.doctor,
    patient: doc.patient,
  });
  console.log(chat);
}
async function handlePreAppointment(next) {
  const patient = await PATIENT.findById(this.patient);
  const doctor = await DOCTOR.findById(this.doctor);
  if (patient.balance < this.cost)
    throw new Error("Not enough balance charge and try again !");
  patient.balance = patient.balance - this.cost; //
  patient.save();
  console.log(patient);
  doctor.balance = doctor.balance + this.cost;
  doctor.save();
  next();
}
module.exports = model("appointment", AppointmentSchema);
