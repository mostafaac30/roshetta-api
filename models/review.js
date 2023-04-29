//Review schema
const mongoose = require("mongoose");

const { Schema, Types, model } = mongoose;

const ReviewSchema = new Schema(
  {
    doctor: {
      type: Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
    patient: {
      type: Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Review", ReviewSchema);
