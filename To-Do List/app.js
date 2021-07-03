//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); // load local module, named date.js


const app = express();

const items = ["Buy Food", "Cook", "Eat"];
const workItems=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

// Response to browser
app.get("/", function(req, res){

  const day = date.getDate(); // add () to call function getDate() insidde date.js

  res.render('list', {listTitle: day, newListItems : items}); //key value matches EJS var

});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/"); // goes back to app.get()
  }
});


app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
})
