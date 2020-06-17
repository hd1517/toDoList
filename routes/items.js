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

// Move to-do item to done
router.route("/done").post((req, res) => {
  const checkedItemId = req.body.checkbox;
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
    const checkItemID = req.body.doneID;
    const formattedName = req.body.doneListName;
    const toDoContent = req.body.doneContent;

    List.findOneAndUpdate({formattedName: formattedName}, {
        $push: {toDo: {_id: checkItemID, content: toDoContent}},
        $pull: {done: {_id: checkItemID}}
    }, function(err){
        res.redirect("/" + formattedName);
      });
});


module.exports = router;
