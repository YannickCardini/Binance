var express = require('express');
var axios = require("axios");

var env = 'https://api.nomics.com/v1';
var router = express.Router();

router.get("/currencies", function (req, res) {
	const key = 'e5ab84f137e59c7d7f7c0ddf2b572092';
	const d = new Date(1613657758001).toISOString();
	console.log(d)
	if (req.query && req.query.symbol )
	axios
		.get(env + "/currencies/sparkline?key=" + key
			+ "&start="+ new Date(1613647758001).toISOString() + "&end=" + new Date(1613657758001).toISOString() + "&"
			+ "ids=" + req.query.symbol)
		.then(resp => {
			res.send(resp.data);
		})
		.catch(err => {
			console.log("Error fetching data from nomics", err);
		});
	else
		res.status(400).send({
			message: 'Arguments missing (needs date and symbol) !'
		});
});

module.exports = router;
