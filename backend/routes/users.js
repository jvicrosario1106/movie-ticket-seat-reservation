const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }
  try {
    const user = await User.findByIdAndRemove(id);
    if (user) {
      res.status(200).json({
        message: "Successfully Delete User",
      });
    } else {
      res.status(400).json({
        message: "Unable to delete user",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to delete user",
    });
  }
});

router.patch("/", async (req, res) => {
  const { _id, firstname, lastname, email, address, mobilenumber } = req.body;
  const getUser = await User.findById(_id);
  const existEmail = await User.find({ _id: { $nin: _id } });

  if (existEmail.find((users) => users.email === email)) {
    return res.status(400).json({
      message: "Email Already Exists",
    });
  }

  try {
    const updatedUser = {
      _id,
      firstname,
      lastname,
      email,
      address,
      mobilenumber,
    };
    const updateUser = await User.findByIdAndUpdate(getUser._id, updatedUser, {
      new: true,
    });

    if (updateUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(400).json({
        message: "Unable to Update User",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Unable to update user",
    });
  }
});

module.exports = router;
