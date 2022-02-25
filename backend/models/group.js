const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
