home.controller('homeController', ['$scope', '$log', '$sce', '$window', '$location', 'markdownService', 'storeService',
	function ($scope, $log, $sce, $window, $location, markdownService, storeService) {
		// UI text
		var OPTIONS_BUTTON_TEXT_HIDE = 'Hide Options',
			OPTIONS_BUTTON_TEXT_SHOW = 'Show Options';

		// UI element IDs
		var hiddenEditorId = '#HiddenEditor',
			markdownInputId = '#MarkdownInput',
			hiddenMarkdownInputId = '#HiddenMarkdownInput',
			htmlOutputElementId = '#HtmlOutput';

		// jQuery objects
		var $hiddenEditor = $(hiddenEditorId),
			$hiddenMarkdownTextArea = $(hiddenMarkdownInputId),
			$markdownTextArea = $(markdownInputId);

		// objects
		var languages = [
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

		// state values
		var isHiddenEditorOpen = false;

		// other values
		var hiddenEditorAnimationDuration = 400,
			hiddenEditorOpenTopValue = 0 + 'px';

		init();

		function init() {
			primeScope();
			fixUiSelectBug();
			configureHiddenEditor();
		}

		function calcHiddenEditorClosedTopValue() {
			var openCloseButtonHeight = 32,
				hiddenEditorClosedTopValue = -($hiddenEditor.height() - openCloseButtonHeight);
			return hiddenEditorClosedTopValue + 'px';
		}

		function closeHiddenEditor() {
			$hiddenEditor.animate({ top: calcHiddenEditorClosedTopValue() }, hiddenEditorAnimationDuration, 'linear');
			isHiddenEditorOpen = false;
		}

		function configureHiddenEditor() {
			$hiddenMarkdownTextArea
				.width($markdownTextArea.width())
				.height($markdownTextArea.height());

			$hiddenEditor.css({ top: calcHiddenEditorClosedTopValue() });
		}

		function fixUiSelectBug() {
			setTimeout(function () {
				$('div.ui-select-container button.btn.btn-default.col-sm-2.col-md-1').addClass('ui-select-fix');
			}, 0);
		}

		function isHtmlOutputEmpty() {
			return $scope.htmlOutput === undefined || $scope.htmlOutput === null || $scope.htmlOutput === '';
		}

		function openHiddenEditor() {
			$hiddenEditor.animate({ top: hiddenEditorOpenTopValue }, hiddenEditorAnimationDuration, 'linear');
			isHiddenEditorOpen = true;
		}

		function openPrintView() {
			updatePreviewPane();
			save();
			$window.open('#/print', '_blank');
		}

		function primeScope() {
			$scope.areOptionsVisible = false;
			$scope.inputText = storeService.getMarkdown() || markdownService.sampleMarkdown;
			$scope.optionsButtonText = OPTIONS_BUTTON_TEXT_SHOW;

			$scope.language = languages[8];
			$scope.languages = languages;

			$scope.hasHtmlOutput = !isHtmlOutputEmpty();
			$scope.openPrintView = openPrintView;
			$scope.toggleHiddenEditor = toggleHiddenEditor;
			$scope.toggleOptions = toggleOptions;
			$scope.updatePreviewPane = updatePreviewPane;
			$scope.updateAndClose = updateAndClose;
		}

		function save() {
			storeService.saveHtml($scope.htmlOutput);
			storeService.saveMarkdown($scope.inputText);
		}

		function toggleHiddenEditor() {
			if (isHiddenEditorOpen) {
				closeHiddenEditor();
			} else {
				openHiddenEditor();
			}
		}

		function toggleOptions() {
			$scope.areOptionsVisible = !$scope.areOptionsVisible;
			$scope.optionsButtonText = $scope.areOptionsVisible ? OPTIONS_BUTTON_TEXT_HIDE : OPTIONS_BUTTON_TEXT_SHOW;
		}

		function updateAndClose() {
			updatePreviewPane();
			closeHiddenEditor();
		}

		function updatePreviewPane() {
			$scope.htmlOutput = markdownService.generateHtml($scope.inputText);
			$scope.hasHtmlOutput = !isHtmlOutputEmpty();
			save();
		}
	}]);