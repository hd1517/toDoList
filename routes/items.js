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
        }
        addToList.toDo.push(item);
        addToList.save();
    });

res.redirect("/" + forList);
});


module.exports = router;
