home.controller('homeController', ['$scope', '$log', '$sce', '$window', '$location', 'markdownService', 'storeService',
	function ($scope, $log, $sce, $window, $location, markdownService, storeService) {
		var htmlOutput = '';

		$scope.inputText = initInputText();
		$scope.hasHtmlOutput = !isHtmlOutputEmpty();
		$scope.openPrintView = openPrintView;
		$scope.updatePreviewPane = updatePreviewPane;

		function generateHtml() {
			return markdownService.generateHtml($scope.inputText);;
		}

		function initInputText() {
			var text = storeService.getMarkdown() || markdownService.sampleMarkdown;
			return text;
		}

		function isHtmlOutputEmpty() {
			return htmlOutput === null || htmlOutput === '';
		}

		function openPrintView() {
			updatePreviewPane();
			save();
			$window.open('#/print', '_blank');
		}

		function save() {
			storeService.saveHtml(htmlOutput);
			storeService.saveMarkdown($scope.inputText);
		}

		function updatePreviewPane() {
			htmlOutput = generateHtml();
			$scope.htmlOutput = htmlOutput;
			$scope.hasHtmlOutput = !isHtmlOutputEmpty();
			save();
		}
	}]);