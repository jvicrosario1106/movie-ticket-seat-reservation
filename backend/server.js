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

mongoose
  .connect(process.env.MONGODB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to Database and localhost");
    });
  })
  .catch((err) => {
    console.log("Error:", err);
  });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/movies", require("./routes/movie"));
app.use("/api/seats", require("./routes/seat"));
app.use("/api/theaters", require("./routes/theater"));
app.use("/api/groups", require("./routes/group"));
app.use("/api/books", require("./routes/book"));
