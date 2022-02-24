const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();
const PORT = 8080;
require("dotenv").config();

app.use(cors());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});

app.get("/", (req, res) => {
  res.cookie("jwt_token", "asdasd", {
    httpOnly: true,
  });
  res.json({
    message: "hello",
  });
});
