var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (request, response) {
	response.sendFile('index.html', { root: path.join(__dirname, "../public/views/") });
});

module.exports = router;