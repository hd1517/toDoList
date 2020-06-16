const mongoose = require("mongoose");
const router = require("express").Router();
let {Item} = require("../models/itemModel");
let List = require("../models/listModel");
const _ = require("lodash");

const item1 = new Item({
    content: "Eat"
});

const item2 = new Item({
    content: "Sleep"
});

const item3 = new Item({
    content: "Clean"
});

const item4 = new Item({
    content: "Read"
});

const list1 = new List({
    name: "Today",
    toDo: [item1, item2],
    done: [item3, item4]
});

const list2 = new List({
    name: "Work",
    toDo: [item4, item2],
    done: [item3, item1 ]
});

const currentYear = new Date().getFullYear();


// SHOW LIST
router.route("/").get((req, res) => {
    List.find({}, function (err, lists) {
        if (lists.length === 0) {
            list1.save();
            list2.save();
            res.redirect("/");
        } else {
            List.findOne({}, function (err, foundList) {
                res.render("index", {
                    currentYear: currentYear,
                    listTitles: lists,
                    showList: foundList
                });
            });
        }

    });
});

// Add New List
router.route("/addNewList").post((req, res) => {
    let newTitle = _.capitalize(req.body.newListTitle);
        formattedTitle = newTitle.replace(/[^a-zA-Z0-9]/g, '_');
        formattedTitle = _.lowerCase(formattedTitle);
    
    List.findOne({ formattedName: formattedTitle }, function (err, listExists) {
        if (!listExists) {
            const list = new List({
                name: newTitle,
                formattedName: formattedTitle
            });

            list.save();
            res.redirect("/" + formattedTitle);
        }
    });
});

module.exports = router;
