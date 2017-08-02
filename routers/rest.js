var express = require('express');
var router = express.Router();
var path = require('path');
var summonerInfoService = require('../services/summonerInfoService');
var playerNameService = require('../services/playerNameService');

router.get('/summonerName/:summonerName', function (request, response) {
	var summonerName = request.params.summonerName;
	summonerInfoService.getSummonerInfoByName(summonerName, function (summonerInfo) {
		response.json(summonerInfo);
	});
});

router.get('/playerName/:summonerName', function (request, response) {
	var summonerName = request.params.summonerName;
	playerNameService.getPlayerNameBySimpleName(summonerName, function (playerName) {
		response.json({
			playerName: playerName
		});
	});
});

module.exports = router;