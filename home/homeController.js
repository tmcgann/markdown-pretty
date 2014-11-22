home.controller('homeController', ['$scope', '$log', '$sce', 'homeService',
	function ($scope, $log, $sce, homeService) {
		var htmlOutput = '';

		$scope.inputText = homeService.sampleMarkdown;
		$scope.hasHtmlOutput = !isHtmlOutputEmpty();
		$scope.generateHtml = generateHtml;

		function generateHtml() {
			htmlOutput = homeService.generateHtml($scope.inputText);
			$scope.htmlOutput = htmlOutput;
			$scope.hasHtmlOutput = !isHtmlOutputEmpty();
		}

		function isHtmlOutputEmpty() {
			return htmlOutput === null || htmlOutput === '';
		}
	}]);