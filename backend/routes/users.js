const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const User = require("../models/user");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({
      message: "Unable to get users",
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
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({
      message: "Unable to get user with this ID",
    });
  }
});

module.exports = router;
