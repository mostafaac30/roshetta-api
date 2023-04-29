//Review schema
const mongoose = require("mongoose");

const { Schema, Types, model } = mongoose;

const MedicalRecord = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    patient: {
      type: Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    prescription: {
      type: String,
    },
    report: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("MedicalRecord", MedicalRecord);
