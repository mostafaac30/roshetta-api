const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Category", CategorySchema);
