const express = require("express");
const router = express.Router();
const Rating = require("../models/rating");
const protectedRoute = require("../middleware/auth");

router.get("/:movieId", protectedRoute, async (req, res) => {
  const { movieId } = req.params;
  try {
    const getRating = await Rating.find({
      user: req.user._id,
      movie: movieId,
    });

    res.status(200).json(getRating);
  } catch (err) {
    res.status(400).json({
      message: "Unable to get the rating",
    });
  }
});

router.post("/", protectedRoute, async (req, res) => {
  const user = req.user._id;
  const { rating, movie } = req.body;

  // Create New
  const newData = { movie, user, rating };

  // Check if exists
  const existMovie = await Rating.find({ movie: movie, user: user });

  // Update Old data
  const oldData = { _id: existMovie._id, user, rating, movie };

  if (existMovie.length > 0 > 0) {
    const update = await Rating.findByIdAndUpdate(existMovie[0]._id, oldData, {
      new: true,
    });
    const getRating = await Rating.findById(existMovie[0]._id);
    return res.status(200).json(getRating);
  }

  try {
    const create = await Rating.create(newData);
    if (create) {
      res.status(200).json(create);
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to rate",
    });
  }
});

module.exports = router;
