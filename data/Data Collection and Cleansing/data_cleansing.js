// Later.js config
var later = require('later');
later.date.UTC();
var textSched = later.parse.text('every 3 day'); // every 3 day

// es config
var es = require('elasticsearch').Client({
  hosts: config.host,
  connectionClass: require('http-aws-es'),
  amazonES: {
    region: 'us-west-2',
    accessKey: config.accessKeyId,
    secretKey: config.secretAccessKey
  }
});

// AWS S3 config
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3();

var cleanDataAndUploadToS3 = function() {

  // delete team.txt (fast)
  fs.unlink('./clean_data/team.txt', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('team.txt deleted successfully');
  });

  // delete champion.txt (slow)
  fs.unlink('./clean_data/champion.txt', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('champion.txt deleted successfully');

    // clean data and write to files
    var globalCount = 0;
    var championStream = fs.createWriteStream("./clean_data/champion.txt", {
      "flags": "a"
    });
    var teamStream = fs.createWriteStream("./clean_data/team.txt", {
      "flags": "a"
    });

    es.search({
      index: 'loldata',
      type: 'matchData',
      scroll: '10s', // keep the search results "scrollable" for 10 seconds
      size: 1000,
      body: {
        "query": {
          "match_all": {}
        }
      }
    }, function getMoreUntilDone(error, response) {
      response.hits.hits.forEach(function(hit) {
        globalCount++;

        // 1. champion.txt
        var championData = hit._source.participants;
        championData.forEach(function(chmp) {
          (function(championName, winner, lane, kills, kda, quadraKills, pentaKills, firstBloodKill) {
            var result = (winner === true ? "win" : "lose");
            championStream.write(championName + "\t" + result + "\t" + lane + "\t" + kills + "\t" + kda + "\t" + quadraKills + "\t" + pentaKills + "\t" + firstBloodKill + "\n");
          })(chmp.name, chmp.winner, chmp.lane, chmp.kills, chmp.kda, chmp.quadraKills, chmp.pentaKills, chmp.firstBlood);
        });

        // 2. team.txt
        var teamData = hit._source.teams;
        teamData.forEach(function(t) {
          (function(teamId, winner, firstBlood, firstTower, firstInhibitor, firstBaron, dragonKills, baronKills, banArray) {
            var result = (winner === true ? "win" : "lose");
            var line = teamId + "\t" + result + "\t" + firstBlood + "\t" + firstTower + "\t" + firstInhibitor + "\t" + firstBaron + "\t" + dragonKills + "\t" + baronKills;

            if (banArray.length !== 0) {
              banArray.forEach(function(b) {
                line += "\t" + b.name;
              });
            }

            teamStream.write(line + "\n");
          })(t.teamId, t.winner, t.firstBlood, t.firstTower, t.firstInhibitor, t.firstBaron, t.dragonKills, t.baronKills, t.bans);
        });

      });

      if (response.hits.total !== globalCount) {
        // ask elasticsearch for the next set of hits from this search
        es.scroll({
          scrollId: response._scroll_id,
          scroll: '10s'
        }, getMoreUntilDone);

        console.log("Amount of matches retrieved: " + globalCount);
      } else {
        console.log("champion.txt and team.txt are ready!");

        // delete all records in loldata index to keep data fresh
        deleteAllTypeRecordsFromES("summonerId");
        deleteAllTypeRecordsFromES("matchId");
        deleteAllTypeRecordsFromES("matchData");
      }
    });

    // give 150s to prepare 2 files
    setTimeout(function() {
      console.log("Ready to upload to S3...");

      // Read in the file, convert it to base64, store to S3
      fs.readFile('./clean_data/team.txt', function(err, data) {
        if (err) {
          throw err;
        }

        var base64data = new Buffer(data, 'binary');

        s3.putObject({
          Bucket: 'admin-matchdata',
          Key: 'team.txt',
          Body: base64data,
          ACL: 'public-read'
        }, function(resp) {
          console.log('Successfully uploaded team.txt.');
        });

      });

      fs.readFile('./clean_data/champion.txt', function(err, data) {
        if (err) {
          throw err;
        }

        var base64data = new Buffer(data, 'binary');

        s3.putObject({
          Bucket: 'admin-matchdata',
          Key: 'champion.txt',
          Body: base64data,
          ACL: 'public-read'
        }, function(resp) {
          console.log('Successfully uploaded champion.txt.');

          // after upload 2 files, use SNS to notificate web server
          var snsParams = {
            TopicArn: "arn:aws:sns:us-west-2:269029038110:twitterChannel",
            Message: "Data Ready"
          };

          sns.publish(snsParams, function(err, res) {
            if (err) {
              console.log(err.stack);
              return;
            }
            console.log("SNS: Message Published!");
          });

        });
      });

    }, 1000 * 150);

  });
};

// set Later.js timer (Interval)
var timer = later.setInterval(cleanDataAndUploadToS3, textSched);
