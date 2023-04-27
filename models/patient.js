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
      type: Boolean,
    },
    balance: {
      type: Number,
      default: 0,
    },
    banned: { type: Boolean, default: false },
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
