const mongoose = require("mongoose");
const router = require("express").Router();
const {Item} = require("../models/itemModel");
const List = require("../models/listModel");
const _ = require("lodash");

let errorMsg = "";
let urlParam = "";

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
                    showList: foundList,
                    errorMsg: errorMsg,
                    urlParam: urlParam
                });
            });
        }

    });
});

// Add New List
router.route("/addNewList").post((req, res) => {
    let newTitle = _.capitalize(req.body.newListTitle);
        lowerCaseTitle = _.lowerCase(newTitle);
        formattedTitle = lowerCaseTitle.replace(/[^a-zA-Z0-9]/g, '_');

        console.log(newTitle, lowerCaseTitle, formattedTitle);
    
    List.findOne({ formattedName: formattedTitle }, function (err, listExists) {
        if (!listExists) {
            const list = new List({
                name: newTitle,
                formattedName: formattedTitle
            });

            list.save();
            res.redirect("/" + formattedTitle);
        } else {
            errorMsg = "A list with this title already exists, you will now be redirected.";
            urlParam = formattedTitle;
            //res.redirect("/" + formattedTitle);
        }
    });
});

router.route("/redirect").post((req, res) => {
    if (errorMsg != "") {
        errorMsg = "";
        res.redirect("/" + urlParam);
    }
});

module.exports = router;
