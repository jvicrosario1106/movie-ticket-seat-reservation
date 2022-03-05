const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please input your firstname"],
    },
    lastname: {
      type: String,
      require: [true, "Please input your lastname"],
    },
    address: {
      type: String,
      required: [true, "Please Input your address"],
    },
    mobilenumber: {
      type: String,
      required: [true, "Please Input your Mobile #"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
