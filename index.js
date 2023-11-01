// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:input", (req,res) => {
  const input = req.params.input;
  let timestamp;
  if (!isNaN(input)) {
    // If the input is a valid Unix timestamp, parse it
    timestamp = parseInt(input, 10);
    return res.json({unix: timestamp, utc: new Date(timestamp).toUTCString()});
  } else {
    // If the input is not a valid Unix timestamp, assume it's a date and try to parse it
    timestamp = Date.parse(input);
  }
  if (!isNaN(timestamp)) {
    res.json({"unix": timestamp, "utc": new Date(timestamp).toUTCString()});
  }
  else {
    res.json({"error": "Invalid Date"});
  }
  
});
app.get("/api/", (req,res) => {
const timeStamp = Date.now();
res.json({"unix": timeStamp, "utc": new Date(timeStamp).toUTCString()});

});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
