angular.module('lolaApp')
	.controller('homeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

		// transform summoner's name
		var simplifyName = function (summonerName) {
		    var lowerName = summonerName.toLowerCase();
		    var simpleName = "";

		    for (var i = 0; i < lowerName.length; i++) {
		        var c = lowerName.charAt(i);
		        if (c != ' ') {
		            simpleName += c;
		        }
		    }

		    return simpleName;
		};

		// click submit
		$scope.submit = function () {
			$location.path('/summonerName/' + simplifyName($scope.summonerName));
		};

		// chart colors global config
        $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72', "#E377C2", "#9467BD", "#66AA00", "#3366CC", "#8C564B"];

        // chart border and background global config
        $scope.datasetOverride = {
            hoverBorderColor: ['#45b7cd', '#ff6384', '#ff8e72', "#E377C2", "#9467BD", "#66AA00", "#3366CC", "#8C564B"]
        };

        // pie chart color config
        $scope.blueVsPurpleColors = ['#3366CC', "#9467BD"];

        // pie chart datasetOverride
        $scope.pieDatasetOverride = {
            hoverBorderColor: ['#3366CC', "#9467BD"]
        };

        // bar chart options config
        $scope.barChartOptions = {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0  // minimum will be 0, unless there is a lower value.
                    }
                }]
            }
        };

        // factor bar chart options config
        $scope.factorOptions = {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0  // minimum will be 0, unless there is a lower value.
                    }
                }]
            },
            legend: { 
            	display: true
            }
        };

        // chart colors global config
        $scope.leftColors = ['#45b7cd', '#45b7cd', '#45b7cd', '#45b7cd', '#45b7cd', '#45b7cd', '#45b7cd', '#45b7cd'];

        // chart border and background global config
        $scope.leftOverride = {
            hoverBorderColor: ['#45b7cd', '#45b7cd', '#45b7cd', '#45b7cd', '#45b7cd', '#45b7cd', '#45b7cd', '#45b7cd']
        };

        // chart colors global config
        $scope.rightColors = ['#ff6384', '#ff6384', '#ff6384', '#ff6384', '#ff6384', '#ff6384', '#ff6384', '#ff6384'];

        // chart border and background global config
        $scope.rightOverride = {
            hoverBorderColor: ['#ff6384', '#ff6384', '#ff6384', '#ff6384', '#ff6384', '#ff6384', '#ff6384', '#ff6384']
        };

        // base chart options config
        $scope.baseChartOptions = {
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0  // minimum will be 0, unless there is a lower value.
                    }
                }]
            },
            legend: { 
            	display: true
            }
        };

        // pie char options config
        $scope.pieChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			legend: { 
            	display: true
            }
        };

        // win rate bar chart options config
        $scope.hWinRateOptions = {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0.475  // minimum will be 0, unless there is a lower value.
                    }
                }]
            }
        };

        $scope.lWinRateOptions = {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0.41  // minimum will be 0, unless there is a lower value.
                    }
                }]
            }
        };

        // high fb bar chart options config
        $scope.fbOptions = {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0.06  // minimum will be 0, unless there is a lower value.
                    }
                }]
            }
        };

        // high kills bar chart options config
        $scope.hKillOptions = {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 6  // minimum will be 0, unless there is a lower value.
                    }
                }]
            }
        };

        /* Data Initialization */
        // 1. Factors Data
        $scope["resultSeries"] = ["Win Team", "Lose Team"];
        $scope["factorLabels"] = ["First Blood", "First Tower", "First Inhibitor", "First Baron"];
        $scope["factorData"] = [
        	[0.59, 0.70, 0.81, 0.48],
        	[0.41, 0.28, 0.08, 0.12]
        ];

        // 2. Dragon Kills Data
        $scope["dragonLabels"] = ["Dragon Kills", "Baron Kills"];
        $scope["dragonData"] = [
        	[2.17, 0.62],
        	[0.86, 0.16]
        ];

        // 3. Blue vs Purple Data
        $scope["blueVsPurpleLabels"] = ["Blue Team", "Purple Team"];
        $scope["blueVsPurpleData"] = [0.505, 0.495];

        // 4. Tier Distribution Data
        $scope["doughnutLabels"] = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
        $scope["doughnutData"] = [0.05, 0.11, 0.27, 0.35, 0.22];

        // 5. highest win rate champions Data 
        $scope["highWinRateLabels"] = ["Vi", "Galio", "Velkoz", "Rammus", "Anivia", "Twitch", "Janna", "Shaco"];
        $scope["highWinRateData"] = [0.545, 0.539, 0.537, 0.533, 0.532, 0.532, 0.529, 0.527];

        // 6. lowest win rate champions Data 
        $scope["lowWinRateLabels"] = ["Azir", "Nidalee", "Kalista", "Urgot", "Ryze", "Talon", "Chogath", "Lissandra"];
        $scope["lowWinRateData"] = [0.422, 0.439, 0.442, 0.452, 0.457, 0.462, 0.463, 0.465];

        // 7. highest pick rate champions
        $scope["highPickRateLabels"] = ["LeeSin", "Vayne", "Caitlyn", "Ezreal", "Jhin", "Thresh", "Lux", "Jinx"];
        $scope["highPickRateData"] = [0.269, 0.266, 0.253, 0.234, 0.231, 0.215, 0.199, 0.196];

        // 8. lowest pick rate champions
        $scope["lowPickRateLabels"] = ["Urgot", "Galio", "Mordekaiser", "AurelionSol", "Taliyah", "Aatrox", "KogMaw", "Karthus"];
        $scope["lowPickRateData"] = [0.008, 0.012, 0.014, 0.015, 0.015, 0.016, 0.017, 0.018];

        // 9. highest ban rate champions
        $scope["highBanRateLabels"] = ["Rengar", "Yasuo", "Syndra", "Zac", "Darius", "Talon", "Zed", "Khazix"];
        $scope["highBanRateData"] = [0.427, 0.424, 0.286, 0.281, 0.257, 0.248, 0.240, 0.219];

        // 10. lowest ban rate champions
        $scope["lowBanRateLabels"] = ["Varus", "Karthus", "Ziggs", "Lulu", "Sivir", "Xerath", "Kalista", "Taliyah"];
        $scope["lowBanRateData"] = [0.050, 0.053, 0.059, 0.062, 0.066, 0.073, 0.082, 0.085];

        // 11. highest first blood rate champions
        $scope["highFbRateLabels"] = ["Pantheon", "Talon", "Leblanc", "Darius", "Fiora", "LeeSin", "Katarina", "Evelynn"];
        $scope["highFbRateData"] = [0.215, 0.205, 0.195, 0.177, 0.176, 0.175, 0.170, 0.168];

        // 12. lowest first blood rate champions
        $scope["lowFbRateLabels"] = ["Janna", "Soraka", "Braum", "Nami", "Alistar", "Taric", "Sona", "Leona"];
        $scope["lowFbRateData"] = [0.020, 0.025, 0.029, 0.034, 0.036, 0.039, 0.043, 0.048];

        // 13. highest kills amount champions
        $scope["highKillLabels"] = ["Katarina", "Fizz", "Akali", "Twitch", "Leblanc", "Talon", "Khazix", "Zed"];
        $scope["highKillData"] = [9.67, 9.36, 9.30, 9.22, 9.06, 8.99, 8.96, 8.95];

        // 14. lowest kills amount champions
        $scope["lowKillLabels"] = ["Soraka", "Janna", "Taric", "Braum", "Nami", "Alistar", "Leona", "Thresh"];
        $scope["lowKillData"] = [0.93, 0.94, 1.51, 1.52, 1.66, 1.78, 2.09, 2.12];

        // 15. highest Quadra Kills amount champions highQuadraLabels
        $scope["highQuadraLabels"] = ["Vayne", "Jinx", "Yasuo", "Caitlyn", "Twitch", "MasterYi", "Ezreal", "Katarina"];
        $scope["highQuadraData"] = [796, 501, 373, 334, 319, 311, 255, 237];

        // 16. highest Penta Kills amount champions
        $scope["highPentaLabels"] = ["Vayne", "Jinx", "Yasuo", "MasterYi", "Twitch", "Ezreal", "Caitlyn", "Katarina"];
        $scope["highPentaData"] = [169, 103, 76, 68, 64, 53, 52, 44];

        // typed.js animation
        (function () {
            $(function(){
                $("#sentence1").typed({
                    strings: ["LOL, ^600 a fantastic and fair game..."],
                    typeSpeed: 0,
                    contentType: 'text',
                    startDelay: 0,
                    showCursor: false
                });

                $("#sentence2").typed({
                    strings: [" Maybe not that <span style='font-weight:bold; color:#ff775c'>Fair</span>?"],
                    typeSpeed: 0,
                    contentType: 'html',
                    startDelay: 4200,
                    showCursor: true,
                    cursorChar: "|"
                });

                $("#sentence3").typed({
                    strings: ["Let\'s see "],
                    typeSpeed: 0,
                    contentType: 'text',
                    startDelay: 6900,
                    showCursor: false
                });

                $("#sentence4").typed({
                    strings: ["<span style='font-weight:bold;'>popular champions</span>.", "<span style='font-weight:bold;'>champion win rate</span>.", "<span style='font-weight:bold;'>who kills most</span>.", "<span style='font-weight:bold;'>different team data......</span>", "more and more Analysis."],
                    typeSpeed: 0,
                    contentType: 'html',
                    startDelay: 7400,
                    backDelay: 1500,
                    showCursor: false,
                });
            });
        })();

	}]);