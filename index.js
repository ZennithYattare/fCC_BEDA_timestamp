/** @format */

// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
	const dateStr = req.params.date;
	let date;
	if (!dateStr) {
		// If date is not provided, use current date
		date = new Date();
	} else if (/^\d+$/.test(dateStr)) {
		// If date is a Unix timestamp, convert it to a Date object
		date = new Date(parseInt(dateStr));
	} else {
		// Try to parse the date string
		date = new Date(dateStr);
		if (isNaN(date.getTime())) {
			// If date string is invalid, return an error
			return res.json({ error: "Invalid Date" });
		}
	}
	// Return the Unix timestamp in milliseconds
	res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log("Your app is listening on port " + listener.address().port);
});
