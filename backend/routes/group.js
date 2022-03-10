const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Group = require("../models/group");

router.get("/", async (req, res) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({
      message: "Unable to get the groups",
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
    const group = await Group.findById(id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(400).json({
        message: "No group with this ID",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Unable to get group with this ID",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create new group",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      message: "Invalid ID",
    });
  }

  try {
    const group = await Group.findByIdAndRemove(id);
    if (group) {
      res.status(200).json({
        message: "Successfully Deleted",
      });
    } else {
      res.status(400).json({
        message: "Unable to delete group with this ID",
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

  const group = await Group.findById(id);

  if (group) {
    Object.assign(group, req.body);
    group.save();
    res.status(200).json(group);
  } else {
    res.status(400).json({
      message: "Unable to update the group",
    });
  }
});

module.exports = router;
