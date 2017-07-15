var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var $ = require("jquery");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

var tables = [];
var waitlist = [];

app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/view", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "view.html"));
});

// Get all characters
app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:x?", function(req, res) {
  var chosen = req.params.x;

  if (chosen==="tables") {
  	res.json(tables);
  } else if (chosen === "waitlist"){
  	res.json(waitlist);
  } else if (chose === "clear"){
  	tables = [];
  	waitlist = [];
  }

  
});


app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newReservation = req.body;

  console.log(newReservation);

  // We then add the json the user sent to the character array
  if(tables.length < 5 ){
  	tables.push(newReservation);
  } else {
  	waitlist.push(newReservation);
  }
  // We then display the JSON to the users
  res.json(newReservation);
});


app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
