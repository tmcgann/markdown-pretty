home.controller('homeController', ['$scope', '$log', '$sce', '$window', '$location', 'markdownService', 'storeService',
	function ($scope, $log, $sce, $window, $location, markdownService, storeService) {
		var OPTIONS_BUTTON_TEXT_HIDE = 'Hide Options',
			OPTIONS_BUTTON_TEXT_SHOW = 'Show Options';

		var htmlOutputElementId = '#HtmlOutput',
			languages = [
				{ name: 'ASP.NET (C#)' },
				{ name: 'Bash' },
				{ name: 'C#' },
				{ name: 'C' },
				{ name: 'C++' },
				{ name: 'C-like' },
				{ name: 'CSS' },
				{ name: 'Git' },
				{ name: 'JavaScript' },
				{ name: 'Markup' },
				{ name: 'Objective-C' },
				{ name: 'Perl' },
				{ name: 'PHP' },
				{ name: 'Python' },
				{ name: 'Ruby' },
				{ name: 'Sass (scss)' },
				{ name: 'SQL' },
				{ name: 'Swift' }
			];

		init();

		function init() {
			$scope.areOptionsVisible = false;
			$scope.inputText = storeService.getMarkdown() || markdownService.sampleMarkdown;
			$scope.optionsButtonText = OPTIONS_BUTTON_TEXT_SHOW;

			$scope.language = languages[8];
			$scope.languages = languages;

			$scope.hasHtmlOutput = !isHtmlOutputEmpty();
			$scope.openPrintView = openPrintView;
			$scope.toggleOptions = toggleOptions;
			$scope.updatePreviewPane = updatePreviewPane;

			fixUiSelectBug();
		}

		function fixUiSelectBug() {
			setTimeout(function () {
				$('div.ui-select-container button.btn.btn-default.col-sm-2.col-md-1').addClass('ui-select-fix');
			}, 0);
		}

		function isHtmlOutputEmpty() {
			return $scope.htmlOutput === undefined || $scope.htmlOutput === null || $scope.htmlOutput === '';
		}

		function openPrintView() {
			updatePreviewPane();
			save();
			$window.open('#/print', '_blank');
		}

		function save() {
			storeService.saveHtml($scope.htmlOutput);
			storeService.saveMarkdown($scope.inputText);
		}

		function toggleOptions() {
			$scope.areOptionsVisible = !$scope.areOptionsVisible;
			$scope.optionsButtonText = $scope.areOptionsVisible ? OPTIONS_BUTTON_TEXT_HIDE : OPTIONS_BUTTON_TEXT_SHOW;
		}

		function updatePreviewPane() {
			$scope.htmlOutput = markdownService.generateHtml($scope.inputText);
			$scope.hasHtmlOutput = !isHtmlOutputEmpty();
			save();
		}
	}]);