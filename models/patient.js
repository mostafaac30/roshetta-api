const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, Types, model } = mongoose;
const { nameRegex } = require("../utils/name");
const PatientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
    DateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    banned: { type: Boolean, default: false },
    phone: {
      type: Number,
      length: 11,
    },
    image: {
      type: String,
      default:
        "https://www.vhv.rs/dpng/d/505-5058560_person-placeholder-image-free-hd-png-download.png",
    },
    //list of doctors ids
    favoriteDoctors: [{ type: Types.ObjectId, ref: "Doctor" }],
    //medical records
    medicalRecords: [
      {
        type: Types.ObjectId,
        ref: "MedicalRecord",
      },
    ],
  },
  { timestamps: true }
);
PatientSchema.pre("save", function (next) {
  if (this.createdAt === this.updatedAt) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

module.exports = model("Patient", PatientSchema);
