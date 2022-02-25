const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Seat = require("../models/seats");

router.get("/", async (req, res) => {
  try {
    const seats = await Seat.find().populate("theater groups").exec();
    res.status(200).json(seats);
  } catch (error) {
    res.status(400).json({
      message: "Unable to get the seats",
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
    const seat = await Seat.findById(id);
    res.status(200).json(seat);
  } catch (error) {
    res.status(400).json({
      message: "Unable to get seat with this ID",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const seat = await Seat.create(req.body);
    res.status(200).json(seat);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create new seat",
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
    const seat = await Seat.findByIdAndRemove(id);
    if (seat) {
      res.status(200).json({
        message: "Successfully Deleted",
      });
    } else {
      res.status(400).json({
        message: "Unable to delete seat with this ID",
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

  const seat = await Seat.findById(id);

  if (seat) {
    Object.assign(seat, req.body);
    seat.save();
    res.status(200).json(seat);
  } else {
    res.status(400).json({
      message: "Unable to update the seat",
    });
  }
});

module.exports = router;
