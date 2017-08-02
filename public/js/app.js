var app = angular.module('lolaApp', ['ngRoute', 'ngResource', 'chart.js']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: './public/views/home.html',
			controller: 'homeController'
		})
		.when('/summonerName/:summonerName', {
            templateUrl: './public/views/summoner.html',
            controller: 'summonerController'
        });
});