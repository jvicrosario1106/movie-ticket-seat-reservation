const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
    },
    minutes: {
      type: Number,
    },
    description: {
      type: String,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Movies = mongoose.model("Movie", movieSchema);

module.exports = Movies;
