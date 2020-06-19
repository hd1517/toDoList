require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Database connect
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established.");
});

// Routes
const listRouter = require("./routes/lists");
const itemsRouter = require("./routes/items");
app.use("/", listRouter);
app.use("/", itemsRouter);

// listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
