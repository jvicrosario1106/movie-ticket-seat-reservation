const express = require("express");
const router = express.Router();
const Movies = require("../models/movie");

router.get("/", async (req, res) => {
  try {
    const movies = await Movies.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({
      message: "Unable to retrieve movies",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movies.findById(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(200).json({ message: "No Movie with this ID" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Unable to retrieve movie with this ID",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const movie = await Movies.create(req.body);
    if (movie) {
      res.status(200).json(movie);
    }
  } catch (error) {
    res.status(400).json({
      message: "Unable to create new movie",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await Movies.findByIdAndRemove(id);

  if (movie) {
    res.status(200).json({
      message: "Successfully Deleted",
    });
  } else {
    res.status(400).json({
      message: "Unable to delete movie with this ID",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  const movie = await Movies.findById(id);

  if (movie) {
    Object.assign(movie, req.body);
    movie.save();
    res.status(200).json(movie);
  } else {
    res.status(400).json({
      message: "Unable to Updated this movie",
    });
  }
});

module.exports = router;
