const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Book = require("../models/book");
const Seat = require("../models/seats");
const protectedRoute = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .populate("user theater seats movie")
      .lean()
      .exec();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({
      message: "Unable to get all bookings",
    });
  }
});

router.get("/userbook", protectedRoute, async (req, res) => {
  const id = req.user._id;

  try {
    const book = await Book.find({ user: id })
      .sort({ createdAt: -1 })
      .populate("user theater seats movie")
      .lean()
      .exec();
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({
      message: "Unable to get the book",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  try {
    const book = await Book.findById(id)
      .populate("user theater seats movie")
      .exec();

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({
        message: "There is no book with this ID",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Unable to get book with this ID",
    });
  }
});

router.post("/", protectedRoute, async (req, res) => {
  const id = req.user._id;

  const { theater, seats, quantity, date, time, movie } = req.body;

  const data = {
    user: id,
    theater,
    seats,
    quantity,
    date,
    time,
    movie,
  };

  try {
    const updateSeats = await Seat.updateOne(
      { _id: seats },
      { $inc: { seats: -quantity } }
    );

    if (updateSeats) {
      const book = await Book.create(data);
      const getBook = await Book.findById(book._id);
      if (book) {
        res.status(200).json(getBook);
      } else {
        res.status(400).json({
          message: "Unable to create new book",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to create new book",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  try {
    const book = await Book.findByIdAndRemove(id);
    if (book) {
      res.status(200).json({
        message: "Successfully deleted",
      });
    } else {
      res.status(404).json({
        message: "No data with this ID",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Unable to delete data with this ID",
    });
  }
});

router.patch("/", async (req, res) => {
  const { _id, date, movie, quantity, seats, theater, time, user } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  try {
    const updateBook = {
      _id,
      date,
      movie,
      quantity,
      seats,
      theater,
      time,
      user,
    };

    const book = await Book.findByIdAndUpdate(_id, updateBook, { new: true });

    if (book) {
      const getUpdateValue = await Book.findById(_id)
        .populate("user theater seats movie")
        .exec();
      res.status(200).json(getUpdateValue);
    } else {
      res.status(404).json({
        message: "No book with this ID",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Unable to update book with this ID",
    });
  }
});

module.exports = router;
