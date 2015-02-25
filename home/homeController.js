home.controller('homeController', ['$scope', '$log', '$sce', '$window', '$location', 'homeService', 'markdownService', 'storeService',
	function ($scope, $log, $sce, $window, $location, homeService, markdownService, storeService) {
		var ui = homeService.ui;

		// jQuery objects
		var $editor = $(ui.ids.editor),
			$expandableEditor = $(ui.ids.expandableEditor),
			$expandableMarkdownTextArea = $(ui.ids.expandableMarkdownInput),
			$markdownTextArea = $(ui.ids.markdownInput),
			$w = $(window);

		// state variables
		var isExpandableEditorButtonVisible = false,
			isExpandableEditorOpen = false;

		// other values
		var expandableEditorDuration = 300,
			expandableEditorEase = 'linear',
			expandableEditorButtonDuration = 200,
			expandableEditorOpenTopValue = 0 + 'px';

		init();

		function init() {
			primeScope();
			updatePreviewPane();
			fixUiSelectBug();
			configureExpandableEditor();
		}

		function calcExpandableEditorHiddenTopValue() {
			var expandableEditorHeight = -$expandableEditor.outerHeight();
			return expandableEditorHeight + 'px';
		}

		function calcExpandableEditorClosedTopValue() {
			var openCloseButtonHeight = 32,
				expandableEditorClosedTopValue = -($expandableEditor.height() - openCloseButtonHeight);
			return expandableEditorClosedTopValue + 'px';
		}

		function closeExpandableEditor() {
			$expandableEditor.animate({ top: calcExpandableEditorClosedTopValue() }, expandableEditorDuration, expandableEditorEase);
			isExpandableEditorOpen = false;
		}

		function configureExpandableEditor() {
			$expandableMarkdownTextArea
				.width($markdownTextArea.width())
				.height($markdownTextArea.height());

			$expandableEditor.css({ top: calcExpandableEditorHiddenTopValue() });

			$w.scroll(toggleExpandableEditorButton);
		}

		function fixUiSelectBug() {
			setTimeout(function () {
				$('div.ui-select-container button.btn.btn-default.col-sm-2.col-md-1').addClass('ui-select-fix');
			}, 0);
		}

		function hideExpandableEditorButton() {
			$expandableEditor.animate({ top: calcExpandableEditorHiddenTopValue() }, expandableEditorButtonDuration, expandableEditorEase);
			isExpandableEditorButtonVisible = false;
			isExpandableEditorOpen = false;
		}

		function isHtmlOutputEmpty() {
			return $scope.htmlOutput === undefined || $scope.htmlOutput === null || $scope.htmlOutput === '';
		}

		function openExpandableEditor() {
			$expandableEditor.animate({ top: expandableEditorOpenTopValue }, expandableEditorDuration, expandableEditorEase);
			isExpandableEditorOpen = true;
		}

		function openPrintView() {
			updatePreviewPane();
			save();
			$window.open('#/print', '_blank');
		}

		function primeScope() {
			$scope.areOptionsVisible = false;
			$scope.inputText = storeService.getMarkdown() || markdownService.sampleMarkdown;
			$scope.optionsButtonText = ui.text.OPTIONS_BUTTON_TEXT_SHOW;

			$scope.language = homeService.codeLanguages[8];
			$scope.languages = homeService.codeLanguages;

			$scope.hasHtmlOutput = !isHtmlOutputEmpty();
			$scope.openPrintView = openPrintView;
			$scope.toggleExpandableEditor = toggleExpandableEditor;
			$scope.toggleOptions = toggleOptions;
			$scope.updatePreviewPane = updatePreviewPane;
			$scope.updateAndClose = updateAndClose;
		}

		function save() {
			storeService.saveHtml($scope.htmlOutput);
			storeService.saveMarkdown($scope.inputText);
		}

		function showExpandableEditorButton() {
			$expandableEditor.animate({ top: calcExpandableEditorClosedTopValue() }, expandableEditorButtonDuration, expandableEditorEase);
			isExpandableEditorButtonVisible = true;
		}

		function toggleExpandableEditor() {
			if (isExpandableEditorOpen) {
				closeExpandableEditor();
			} else {
				openExpandableEditor();
			}
		}

		function toggleExpandableEditorButton() {
			var scrollPosition = $w.scrollTop(),
				editorBottom = $editor.offset().top + $editor.height(),
				isEditorVisible = scrollPosition < editorBottom;

			if (isEditorVisible && isExpandableEditorButtonVisible) {
				hideExpandableEditorButton();
			} else if (!isEditorVisible && !isExpandableEditorButtonVisible) {
				showExpandableEditorButton();
			}
		}

		function toggleOptions() {
			$scope.areOptionsVisible = !$scope.areOptionsVisible;
			$scope.optionsButtonText = $scope.areOptionsVisible ? ui.text.OPTIONS_BUTTON_TEXT_HIDE : ui.text.OPTIONS_BUTTON_TEXT_SHOW;
		}

		function updateAndClose() {
			updatePreviewPane();
			closeExpandableEditor();
		}

		function updatePreviewPane() {
			$scope.htmlOutput = markdownService.generateHtml($scope.inputText);
			$scope.hasHtmlOutput = !isHtmlOutputEmpty();
			save();
		}
	}]);

// TODO
//
// - Kill events (e.g. scroll event) on controller disposal
// - Double clicking a word/line/header in the output section scrolls to that same subject in the textarea(s)