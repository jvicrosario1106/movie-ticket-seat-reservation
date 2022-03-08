const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
    },
    seats: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
    },
    quantity: {
      type: Number,
    },
    date: {
      type: Date,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
