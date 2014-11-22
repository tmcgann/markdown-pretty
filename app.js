var app = angular.module('app', [
		'ngRoute',
		'ngSanitize',
		'home'
	]);

app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'home/home.html',
        		controller: 'homeController'
			})
			.otherwise({
				redirectTo: '/home'
			});
	}]);