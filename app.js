var app = angular.module('app', [
		'ngCookies',
		'ngRoute',
		'ngSanitize',
		'components',
		'home',
		'print'
	]);

app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'home/home.html',
        		controller: 'homeController'
			})
			.when('/print', {
				templateUrl: 'print/print.html',
        		controller: 'printController'
			})
			.otherwise({
				redirectTo: '/home'
			});
	}]);