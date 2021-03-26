var express = require('express');
var axios = require("axios");

var env = 'https://api.nomics.com/v1';
var router = express.Router();

Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

router.get("/getPriceAtTime", function (req, res) {
	const key = 'e5ab84f137e59c7d7f7c0ddf2b572092';

	if (req.query && req.query.symbol && req.query.time) {
		const start = (new Date(+req.query.time).addDays(-1)).toISOString();
		const end = (new Date(+req.query.time)).toISOString();
		axios
			.get(env + "/exchange-rates/history?key=" + key
				+ "&start=" + start + "&end=" + end + "&"
				+ "currency=" + req.query.symbol)
			.then(resp => {
				res.send(resp.data);
			})
			.catch(err => {
				console.log("Error fetching data from nomics", err);
			});
	}
	else
		res.status(400).send({
			message: 'Arguments missing (needs date and symbol) !'
		});
});

module.exports = router;
