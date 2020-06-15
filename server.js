const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// local database
mongoose.connect("mongodb://localhost:27017/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established.");
});

// Routes
const listRouter = require("./routes/lists");
app.use("/", listRouter);

// listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
