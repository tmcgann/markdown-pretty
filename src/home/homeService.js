home.factory('homeService', [
	function () {
		var
			codeLanguages = [
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
			],
			ui = {
				ids: {
					editor: '#Editor',
					expandableEditor: '#ExpandableEditor',
					expandableEditorButton: '#ExpandableEditorButton',
					markdownInput: '#MarkdownInput',
					expandableMarkdownInput: '#ExpandableMarkdownInput',
					htmlOutputElement: '#HtmlOutput'
				},
				text: {
					OPTIONS_BUTTON_TEXT_HIDE: 'Hide Options',
					OPTIONS_BUTTON_TEXT_SHOW: 'Show Options'
				}
			};

		return {
			codeLanguages: codeLanguages,
			ui: ui
		};
	}]);