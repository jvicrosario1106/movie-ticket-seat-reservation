const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    ratings: {
      type: mongoose.Schema.Types.Decimal128,
    },
  },
  { timestamps: true }
);

const Ratings = mongoose.model("Rating", ratingSchema);

module.exports = Ratings;
