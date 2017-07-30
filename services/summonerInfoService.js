var championInfo = require("../championInfo.json");
// setting default platformId to be used if you don't specify it on the endpoint method
process.env.LEAGUE_API_PLATFORM_ID = 'na1';
process.env.LEAGUE_API_KEY = require("../config").lolApiKey;
const LeagueJs = require('leaguejs/lib/LeagueJS.js');
const api = new LeagueJs(process.env.LEAGUE_API_KEY);

var getSummonerInfoByName = function (summonerName, callback) {

	// 首先要得到 id
  api.Summoner
    .gettingByName(summonerName)
    .then(summoner => {
      'use strict';
      var summonerId = summoner.id;

      // 用 id 去请求前10个最熟练的 champions
      api.ChampionMastery
        .gettingBySummoner(summonerId)
        .then(topChampions => {
          'use strict';
          addChampionName(topChampions.slice(0, 11), 0, callback);
        })
        .catch(err => {
          'use strict';
          console.log(err);
        });
    })
    .catch(err => {
      'use strict';
      console.log(err);
    });
};

// add champion name to topChampions array
var addChampionName = function (topChampions, i, callback) {
	var championId = topChampions[i].championId;

	var options = {
		champData: 'tags',
		locale: 'en_US',
		dataById: true
	};

  var championStaticData = championInfo.data[championId];
  topChampions[i].name = championStaticData.name;
  topChampions[i].title = championStaticData.title;
  topChampions[i].tags = championStaticData.tags.join(" / ");
  topChampions[i].key = championStaticData.key;

  if (i === topChampions.length - 1) {
    callback(topChampions);
  } else {
    // 没有到结尾，因此继续递归调用，保证强制同步
    addChampionName(topChampions, i + 1, callback);
  }
};

module.exports = {
	getSummonerInfoByName: getSummonerInfoByName
};