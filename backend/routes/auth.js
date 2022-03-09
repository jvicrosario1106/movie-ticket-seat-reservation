const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const protectedRoute = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const { firstname, lastname, address, mobilenumber, email, password, type } =
    req.body;

  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return res.status(400).json({
      message: "Email already Exist",
    });
  }

  const genSalt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, genSalt);

  const user = await User.create({
    firstname,
    lastname,
    address,
    mobilenumber,
    email,
    password: hashPassword,
    type,
  });

  if (user) {
    res.status(200).json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } else {
    res.status(400).json({
      message: "Unable to register, Please Try again",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const checkEmail = await User.findOne({ email });

  if (checkEmail && (await bcrypt.compare(password, checkEmail.password))) {
    const token = jwt.sign({ id: checkEmail._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .cookie("jwt_token", token, {
        httpOnly: true,
        sameSite: "none",
      })
      .json({
        email: checkEmail.email,
        firstname: checkEmail.firstname,
        lastname: checkEmail.lastname,
        type: checkEmail.type,
      });
  } else {
    res.status(400).clearCookie("jwt_token").json({
      message: "Invalid Credentials",
    });
  }
});

router.get("/logout", (req, res) => {
  res.status(200).clearCookie("jwt_token").json({
    message: "Successfully Logout",
  });
});

router.get("/me", protectedRoute, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
