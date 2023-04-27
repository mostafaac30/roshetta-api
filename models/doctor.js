const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;
const bcrypt = require("bcrypt");
const { nameRegex } = require("../utils/name");

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    AppointmentCost: {
      type: Number,
      default: 0,
    },
    workHours: {
      from: {
        type: Number,
        default: 12,
      },
      to: {
        type: Number,
        default: 12,
      },
    },
    address: {
      type: String,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    banned: { type: Boolean, default: false },
    phone: {
      type: Number,
      length: 11,
    },
  },
  { timestamps: true }
);
DoctorSchema.pre("save", function (next) {
  if (this.createdAt === this.updatedAt) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

module.exports = model("Doctor", DoctorSchema);
