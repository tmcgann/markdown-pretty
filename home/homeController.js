home.controller('homeController', ['$scope', '$log', '$sce', '$window', '$location', 'markdownService', 'storeService',
	function ($scope, $log, $sce, $window, $location, markdownService, storeService) {
		var htmlOutput = '';

		$scope.inputText = markdownService.sampleMarkdown;
		$scope.hasHtmlOutput = !isHtmlOutputEmpty();
		$scope.openPrintView = openPrintView;
		$scope.updatePreviewPane = updatePreviewPane;

		function generateHtml() {
			return markdownService.generateHtml($scope.inputText);
		}

		function isHtmlOutputEmpty() {
			return htmlOutput === null || htmlOutput === '';
		}

		function openPrintView() {
			updatePreviewPane();
			storeService.saveHtmlToStore(htmlOutput);
			$window.open('#/print', '_blank');

			// var config = {
			// 	params: {
			// 		html: htmlOutput
			// 	}
			// };
			// $http.post("server.php", null, config)
			// 	.success(function (data, status, headers, config) {
			// 		$scope[resultVarName] = data;
			// 	})
			// 	.error(function (data, status, headers, config) {
			// 		$scope[resultVarName] = "SUBMIT ERROR";
			// 	});
		}

		function updatePreviewPane() {
			htmlOutput = generateHtml();
			$scope.htmlOutput = htmlOutput;
			$scope.hasHtmlOutput = !isHtmlOutputEmpty();
		}
	}]);