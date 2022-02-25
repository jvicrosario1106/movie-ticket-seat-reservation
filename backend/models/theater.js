const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const theaterSchema = Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;
