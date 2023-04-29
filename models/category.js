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
      default:
        "https://as2.ftcdn.net/v2/jpg/03/85/95/63/1000_F_385956366_Zih7xDcSLqDxiJRYUfG5ZHNoFCSLMRjm.jpg",
    },
  },
  { timestamps: true }
);

module.exports = model("Category", CategorySchema);
