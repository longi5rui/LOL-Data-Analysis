// setting default platformId to be used if you don't specify it on the endpoint method
process.env.LEAGUE_API_PLATFORM_ID = 'na1';
process.env.LEAGUE_API_KEY = require("../config").lolApiKey;
const LeagueJs = require('leaguejs/lib/LeagueJS.js');
const api = new LeagueJs(process.env.LEAGUE_API_KEY);

var getPlayerNameBySimpleName = function (simpleName, callback) {
  api.Summoner
    .gettingByName(simpleName)
    .then(data => {
      'use strict';
      callback(data.name);
    })
    .catch(err => {
      'use strict';
      console.log(err);
    });
};

module.exports = {
  getPlayerNameBySimpleName: getPlayerNameBySimpleName
};