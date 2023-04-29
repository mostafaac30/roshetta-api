//Review schema
const mongoose = require("mongoose");

const { Schema, Types, model } = mongoose;

const MedicalRecord = new Schema(
  {
    patient: {
      type: Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    prescription: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("MedicalRecord", MedicalRecord);
