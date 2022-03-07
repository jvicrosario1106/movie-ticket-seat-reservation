const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Seat = require("../models/seats");

router.get("/", async (req, res) => {
  try {
    const seats = await Seat.find()
      .populate("theater groups")
      .sort({ createdAt: -1 })
      .exec();
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
    const newSeats = await Seat.findById(seat._id)
      .populate("theater groups")
      .exec();
    res.status(200).json(newSeats);
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

router.patch("/", async (req, res) => {
  const { _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({
      message: "Invalid ID",
    });
  }

  const seat = await Seat.findById(_id);

  if (seat) {
    const updateValue = await Seat.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (updateValue) {
      const getUpdateValue = await Seat.findById(_id)
        .populate("theater groups")
        .exec();

      res.status(200).json(getUpdateValue);
    }
  } else {
    res.status(400).json({
      message: "Unable to update the seat",
    });
  }
});

module.exports = router;
