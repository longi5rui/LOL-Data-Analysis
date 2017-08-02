angular.module('lolaApp')
	.controller('summonerController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

		$http.get('/api/v1/playerName/' + $routeParams.summonerName)
			.success(function (data) {
				$scope["playerName"] = data.playerName;
			});

		$scope["champion0Id"] = 'load';
		$scope["champion1Id"] = 'load';
		$scope["champion2Id"] = 'load';

		$http.get('/api/v1/summonerName/' + $routeParams.summonerName)
			.success(function (data) {
				$scope.num = data.length;

				// retrive top 3 champion's data
				for (var i = 0; i <= 2; i++) {
					$scope["champion" + i + "Id"] = data[i].championId;
					$scope["champion" + i + "Name"] = data[i].name;
					$scope["champion" + i + "Title"] = data[i].title;
					$scope["champion" + i + "Level"] = data[i].championLevel;
					$scope["champion" + i + "Points"] = data[i].championPoints;
					$scope["champion" + i + "Tags"] = data[i].tags;
					$scope["champion" + i + "Key"] = data[i].key.toLowerCase();
				}

				// calculate champion role points
				var tagPoints = {
					AssassinPoints: 0,
					FighterPoints: 0,
					MagePoints: 0,
					MarksmanPoints: 0,
					TankPoints: 0,
					SupportPoints: 0
				};

				for (var i = 0; i < data.length; i++) {
					var tagsArray = data[i].tags.split(" / ");
					tagPoints[tagsArray[0] + "Points"] += data[i].championPoints;
					tagPoints[tagsArray[1] + "Points"] += data[i].championPoints;
				}

				// add some salt on support and tank
				tagPoints.TankPoints += Math.floor(data[data.length - 2].championPoints);
				tagPoints.SupportPoints += Math.floor(data[data.length - 1].championPoints);

				// radar chart data
				$scope.roleData = [tagPoints.AssassinPoints, tagPoints.FighterPoints, tagPoints.MagePoints, tagPoints.MarksmanPoints, tagPoints.TankPoints, tagPoints.SupportPoints];

			});

		$scope.radarChartOptions = {
            scale: {
                reverse: false,
                ticks: {
                    beginAtZero: true
                }
            }
    	};

    	$scope.colors = [{
			pointBackgroundColor: 'rgba(255, 0, 20, 0.4)',
			pointHoverBackgroundColor: 'rgba(255, 0, 0, 1)',
			borderColor: '#00ff00',
			pointBorderColor: '#00ff00',
			pointHoverBorderColor: 'rgba(255, 0, 0, 1)'
		}];

    	// radar chart labels
		$scope.roleLabels = ["Assassin", "Fighter", "Mage", "Marksman", "Tank", "Support"];


	}]);