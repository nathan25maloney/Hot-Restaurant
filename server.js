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

app.use(express.static(path.join(__dirname, 'css')));

var tables = [];
var waitlist = [];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/api/:x?", function(req, res) {
  var chosen = req.params.x;

  if (chosen==="tables") {
  	res.json(tables);
  } else if (chosen === "waitlist"){
  	res.json(waitlist);

  } else if (chosen === "clear"){
  	tables = [];
  	waitlist = [];
  }

  });


app.post("/api/tables", function(req, res) {
  var newReservation = req.body;
  
  console.log(newReservation);

  if(tables.length < 5 ){
  	newReservation.hasTable = true;
  	if(!check(newReservation,tables)){
  		tables.push(newReservation);
  	}
  	
  } else {
  	newReservation.hasTable = false;
  	if(!check(newReservation,waitlist)&&!check(newReservation,tables)){
  		waitlist.push(newReservation);
  	}
  }
  res.json(newReservation);
});

app.post("/api/clear", function(req, res) {
  tables= [];
  waitlist = [];
});


app.listen(port, function() {
  console.log("App listening on PORT " + port);
});


function isEquivalent(a, b) {
    
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}

function check(a,b){
	for (var i = b.length - 1; i >= 0; i--) {
		if(isEquivalent(a,b[i])){
			return true;
		}
	}
}
