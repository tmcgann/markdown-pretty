home.factory('homeService', [
	function () {
		// Variables
		var
			sampleMarkdown = 'Title\n=====\n\nSubtitle\n--------\n\nType **Markdown** here.';

		// Functions
		var
			generateHtml = function (inputText) {
				return markdown.toHTML(inputText);
			};

		return {
			generateHtml: generateHtml,
			sampleMarkdown: sampleMarkdown
		};
	}]);