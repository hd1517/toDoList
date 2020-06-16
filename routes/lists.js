const mongoose = require("mongoose");
const router = require("express").Router();
let {Item} = require("../models/itemModel");
let List = require("../models/listModel");

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


// Home page: Will show last added list first
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

// Show specific list
router.route("/:listName").get((req, res) => {
    const urlTitle = req.params.listName;

    List.find({}, (err, listTitles) => {
        List.findOne({formattedName: urlTitle}, (err, thisList) => {
            if (err) {
                console.log(err);
            } else {
                res.render("index", {
                    currentYear: currentYear,
                    listTitles: listTitles,
                    showList: thisList
                });
            }
        });
    });
});


module.exports = router;
