components.factory('markdownService', [
	function () {
		// Variables
		var
			sampleMarkdown = 'Title\n=====\n\nHeader\n--------\n\nExample **Markdown**.';

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