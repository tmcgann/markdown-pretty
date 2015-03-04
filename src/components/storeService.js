components.factory('storeService', ['localStorageService',
	function (localStorageService) {
		// Variables
		var
			htmlOutputKey = 'htmlOutput',
			markdownInputKey = 'markdownInput';

		// Functions
		var
			getHtml = function () {
				return localStorageService.get(htmlOutputKey);
			},

			getMarkdown = function () {
				return localStorageService.get(markdownInputKey);
			},

			saveHtml = function (html) {
				localStorageService.set(htmlOutputKey, html);
			},

			saveMarkdown = function (html) {
				localStorageService.set(markdownInputKey, html);
			};

		return {
			getHtml: getHtml,
			getMarkdown: getMarkdown,
			saveHtml: saveHtml,
			saveMarkdown: saveMarkdown
		};
	}]);