const mongoose = require("mongoose");

// Schemas
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  content: String,
});

const listSchema = new Schema({
  name: String,
  toDo: [itemsSchema],
  done: [itemsSchema],
});

// Model
const List = mongoose.model("List", listSchema);

module.exports = List;
