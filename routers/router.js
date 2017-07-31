var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/riot.txt', function(request, response) {
  response.sendFile('riot.txt', { root: path.join(__dirname, "../") });
});

router.get('/', function (request, response) {
	response.sendFile('index.html', { root: path.join(__dirname, "../public/views/") });
});

module.exports = router;