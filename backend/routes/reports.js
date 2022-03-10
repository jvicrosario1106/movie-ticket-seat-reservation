const express = require("express");
const router = express.Router();
const Movies = require("../models/movie");
const Seats = require("../models/seats");
const Theaters = require("../models/theater");
const Ratings = require("../models/rating");
const Books = require("../models/book");

router.get("/", async (req, res) => {
  try {
    const [movies, seats, theaters, ratings, books] = await Promise.all([
      Movies.find().sort({ createdAt: -1 }).lean(),
      Seats.find().lean(),
      Theaters.find().lean(),
      Ratings.aggregate([
        {
          $lookup: {
            from: "movies",
            localField: "movie",
            foreignField: "_id",
            as: "movie",
          },
        },
        {
          $group: {
            _id: "$movie",
            averageRatings: {
              $avg: "$rating",
            },
          },
        },
        {
          $sort: { averageRatings: -1 },
        },
      ]),
      Books.aggregate([
        {
          $lookup: {
            from: "movies",
            localField: "movie",
            foreignField: "_id",
            as: "movie",
          },
        },
        {
          $group: {
            _id: "$movie",
            movieCount: {
              $count: {},
            },
          },
        },
      ]),
    ]);

    res.status(200).json({ movies, seats, theaters, ratings, books });
  } catch (err) {
    res.status(400).json({
      message: "Unable to get the reports",
    });
  }
});

module.exports = router;
