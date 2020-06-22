const mongoose = require("mongoose");
const router = require("express").Router();
let List = require("../models/listModel");

// Add item to specific list depending on route parameter
router.route("/addItem").post((req, res) => {
  const newItem = req.body.newItem;
  const forList = req.body.list;

  List.findOne({ formattedName: forList }, function (err, addToList) {
    const item = {
      content: newItem,
    };
    addToList.toDo.push(item);
    addToList.save();
  });

  res.redirect("/" + forList);
});

// Move toDo item to done
router.route("/done").post((req, res) => {
  const checkedItemId = req.body.itemID;
  const formattedName = req.body.listName;
  const content = req.body.toDoContent;

  List.findOneAndUpdate(
    { formattedName: formattedName },
    {
      $push: { done: { _id: checkedItemId, content: content } },
      $pull: { toDo: { _id: checkedItemId } },
    },
    function (err) {
      res.redirect("/" + formattedName);
    }
  );
});

// Move done items back to toDo if checkbox checked
router.route("/toDoAgain").post((req, res) => {
  const checkedItemId = req.body.doneID;
  const formattedName = req.body.doneListName;
  const content = req.body.doneContent;

  List.findOneAndUpdate(
    { formattedName: formattedName },
    {
      $push: { toDo: { _id: checkedItemId, content: content } },
      $pull: { done: { _id: checkedItemId } },
    },
    function (err) {
      res.redirect("/" + formattedName);
    }
  );
});

// Delete items
router.route("/delete").post((req, res) => {
  const deleteID = req.body.deleteID;
  const deleteListID = req.body.deleteListID;
  const deleteFrom = req.body.deleteFrom;

  if (deleteFrom === "toDo") {
    List.findOneAndUpdate(
      { _id: deleteListID },
      {
        $pull: { toDo: { _id: deleteID } },
      },
      function (err, result) {
        res.send(result);
      }
    );
  }

  if (deleteFrom === "done") {
    List.findOneAndUpdate(
      { _id: deleteListID },
      {
        $pull: { done: { _id: deleteID } },
      },
      function (err, result) {
        res.send(result);
      }
    );
  }
});

// Update toDo Items 
router.route("/editToDo").post((req, res) => {
    const checkedItemId = req.body.itemID;
    const listID = req.body.listID;
    const content = req.body.toDoContent;
  
    // toDo
    List.findOneAndUpdate(
      { _id: listID, "toDo._id": checkedItemId},
      { "toDo.$.content" : content },
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    ); 
});

// Update done Items 
router.route("/editDone").post((req, res) => {
    const checkedItemId = req.body.doneID;
    const listID = req.body.doneListID;
    const content = req.body.doneContent;
  
    // toDo
    List.findOneAndUpdate(
      { _id: listID, "done._id": checkedItemId},
      { "done.$.content" : content },
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    ); 
});

module.exports = router;
