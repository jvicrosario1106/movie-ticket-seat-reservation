const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("user theater seats movie").exec();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({
      message: "Unable to get all bookings",
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

router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    if (book) {
      res.status(200).json({
        message: "You've created new book",
      });
    } else {
      res.status(400).json({
        message: "Unable to create new book",
      });
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
    const book = Book.findByIdAndRemove(id);
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

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  try {
    const book = Book.findById(id);
    if (book) {
      Object.assign(book, req.body);
      book.save();
      res.status(200).json(book);
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
