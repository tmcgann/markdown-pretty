home.controller('homeController', ['$scope', '$log', '$sce', '$window', '$location', 'markdownService', 'storeService',
	function ($scope, $log, $sce, $window, $location, markdownService, storeService) {
		// UI text
		var OPTIONS_BUTTON_TEXT_HIDE = 'Hide Options',
			OPTIONS_BUTTON_TEXT_SHOW = 'Show Options';

		// UI element IDs
		var editorId = '#Editor',
			expandableEditorId = '#ExpandableEditor',
			markdownInputId = '#MarkdownInput',
			expandableMarkdownInputId = '#ExpandableMarkdownInput',
			htmlOutputElementId = '#HtmlOutput';

		// jQuery objects
		var $editor = $(editorId),
			$expandableEditor = $(expandableEditorId),
			$expandableMarkdownTextArea = $(expandableMarkdownInputId),
			$markdownTextArea = $(markdownInputId),
			$w = $(window);

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
		var isExpandableEditorButtonVisible = false,
			isExpandableEditorOpen = false;

		// other values
		var expandableEditorAnimationDuration = 400,
			expandableEditorEase = 'linear',
			expandableEditorButtonAnimationDuration = 200,
			expandableEditorOpenTopValue = 0 + 'px';

		init();

		function init() {
			primeScope();
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
			$expandableEditor.animate({ top: calcExpandableEditorClosedTopValue() }, expandableEditorAnimationDuration, expandableEditorEase);
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
			$expandableEditor.animate({ top: calcExpandableEditorHiddenTopValue() }, expandableEditorButtonAnimationDuration, expandableEditorEase);
			isExpandableEditorButtonVisible = false;
			isExpandableEditorOpen = false;
		}

		function isHtmlOutputEmpty() {
			return $scope.htmlOutput === undefined || $scope.htmlOutput === null || $scope.htmlOutput === '';
		}

		function openExpandableEditor() {
			$expandableEditor.animate({ top: expandableEditorOpenTopValue }, expandableEditorAnimationDuration, expandableEditorEase);
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
			$scope.optionsButtonText = OPTIONS_BUTTON_TEXT_SHOW;

			$scope.language = languages[8];
			$scope.languages = languages;

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
			$expandableEditor.animate({ top: calcExpandableEditorClosedTopValue() }, expandableEditorButtonAnimationDuration, expandableEditorEase);
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
			$scope.optionsButtonText = $scope.areOptionsVisible ? OPTIONS_BUTTON_TEXT_HIDE : OPTIONS_BUTTON_TEXT_SHOW;
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