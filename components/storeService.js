components.factory('storeService', ['localStorageService',
	function (localStorageService) {
		// Variables
		var
			htmlOutputKey = 'htmlOutpout';

		// Functions
		var
			getHtmlFromStore = function () {
				return localStorageService.get(htmlOutputKey);
			},

			saveHtmlToStore = function (html) {
				localStorageService.set(htmlOutputKey, html);
			};

		return {
			getHtmlFromStore: getHtmlFromStore,
			saveHtmlToStore: saveHtmlToStore
		};
	}]);