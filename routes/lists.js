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
    formattedName: "today",
    toDo: [item1, item2],
    done: [item3, item4]
});

const list2 = new List({
    name: "Work",
    formattedName: "work",
    toDo: [item4, item2],
    done: [item3, item1 ]
});

const currentYear = new Date().getFullYear();

// Home page
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

// Show list using parameters
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
                    showList: thisList,
                    errorMsg: errorMsg,
                    urlParam: urlParam
                });
            }
        });
    });
});

// Add New List
router.route("/addNewList").post((req, res) => {
    let newTitle = _.capitalize(req.body.newListTitle);
        lowerCaseTitle = _.lowerCase(newTitle);
        formattedTitle = lowerCaseTitle.replace(/[^a-zA-Z0-9]/g, '_');
    
    List.findOne({ formattedName: formattedTitle }, function (err, listExists) {
        if (!listExists) {
            const list = new List({
                name: newTitle,
                formattedName: formattedTitle
            });

            list.save();
            res.redirect("/" + formattedTitle);
        } else {
            errorMsg = "A list with this title already exists, you have now been redirected.";
            urlParam = formattedTitle;
            res.redirect("/" + formattedTitle);
        }
    });
});

// If user tries to add new list title that already exists, redirect
router.route("/redirect").post((req, res) => {
    if (errorMsg != "") {
        errorMsg = "";
        res.redirect("/" + urlParam);
    }
});

// Delete list
router.route("/deleteList").post((req, res) => {
    const listToDelete = req.body.listToDelete;

    List.findByIdAndRemove(listToDelete, function(err) {
        if (!err) {
            res.redirect("/");
        }
    });
})

// Update list title
router.route("/editTitle").post((req, res) => {
    let newTitle = req.body.newListTitle;
    let newFormattedName = _.lowerCase(newTitle).replace(/[^a-zA-Z0-9]/g, '_');
    const oldFormattedName = req.body.formattedTitle;

    List.findOneAndUpdate(
        { formattedName: oldFormattedName},
        { name : newTitle, formattedName: newFormattedName },
        function (err) {
          res.redirect("/" + newFormattedName);
        }
      ); 

})


module.exports = router;
