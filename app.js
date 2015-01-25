var app = angular.module('app', [
		'ngCookies',
		'ngRoute',
		'ngSanitize',
		'LocalStorageModule',
		'ui.select',
		'components',
		'home',
		'print'
	]);

app.config(['$routeProvider', 'localStorageServiceProvider',
	function ($routeProvider, localStorageServiceProvider) {
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

		localStorageServiceProvider
			.setPrefix('mdPretty');
	}]);