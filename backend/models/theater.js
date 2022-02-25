const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const theaterSchema = Schema({
  name: {
    type: String,
  },
});

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;
