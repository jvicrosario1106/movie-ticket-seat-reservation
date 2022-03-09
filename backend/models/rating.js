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
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
