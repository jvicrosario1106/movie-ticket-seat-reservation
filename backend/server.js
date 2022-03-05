const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();
const PORT = 8080;
const whitelist = ["http://localhost:3000"];
require("dotenv").config();

app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  bodyparser.urlencoded({
    extended: true,
    limit: "100mb",
  })
);
app.use(bodyparser.json({ limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

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
app.use("/api/users", require("./routes/users"));
