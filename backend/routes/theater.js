const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Theater = require("../models/theater");

router.get("/", async (req, res) => {
  try {
    const theaters = await Theater.find().sort({ createdAt: -1 });
    res.status(200).json(theaters);
  } catch (error) {
    res.status(400).json({
      message: "Unable to get the theaters",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Invalid ID",
    });
  }

  try {
    const theater = await Theater.findById(id);
    res.status(200).json(theater);
  } catch (error) {
    res.status(400).json({
      message: "Unable to get theater with this ID",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const theater = await Theater.create(req.body);
    res.status(200).json(theater);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create new theater",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Invalid ID",
    });
  }

  try {
    const theater = await Theater.findByIdAndRemove(id);
    if (theater) {
      res.status(200).json({
        message: "Successfully Deleted",
      });
    } else {
      res.status(400).json({
        message: "Unable to delete theater with this ID",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Unable to delete",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Invalid ID",
    });
  }
  try {
    const theater = await Theater.findById(id);

    if (theater) {
      Object.assign(theater, req.body);
      theater.save();
      res.status(200).json(theater);
    } else {
      res.status(400).json({
        message: "Unable to update the theater",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to Update with this ID",
    });
  }
});

module.exports = router;
