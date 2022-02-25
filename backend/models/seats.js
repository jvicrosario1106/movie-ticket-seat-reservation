const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = Schema(
  {
    name: {
      type: String,
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Theater",
    },
    groups: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Group",
    },
    seats: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
