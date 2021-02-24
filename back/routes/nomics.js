var express = require('express');
var axios = require("axios");

var env = 'https://api.nomics.com/v1';
var router = express.Router();

router.get("/prices", function (request, response) {
	const key = 'e5ab84f137e59c7d7f7c0ddf2b572092';
	axios
		.get(env + "/prices?key=" + key)
		.then(resp => {
			response.send(resp.data);
		})
		.catch(err => {
			console.log("Error fetching data from nomics", err);
		});
});

module.exports = router;
