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

  if (chosen==="table") {
  	console.log(req);
  } else if (chosen === "waitlist"){
  	console.log(req);
  }

  
});


app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newcharacter = req.body;

  console.log(newcharacter);

  // We then add the json the user sent to the character array
  characters.push(newcharacter);

  // We then display the JSON to the users
  res.json(newcharacter);
});


app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
