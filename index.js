const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const port = 5000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to Database Successfully");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Require routes
const userRoutes = require("./routes/userRoute");

app.use("user/", userRoutes);

app.get("/", (req, res) => {
  res.json("Back end for Auth Page");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

module.exports = app