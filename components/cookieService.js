components.factory('cookieService', ['$cookieStore',
	function ($cookieStore) {
		// Variables
		var
			htmlOutputCookieKey = 'markdownPrettyHtmlOutput';

		// Functions
		var
			getHtmlFromCookie = function () {
				return $cookieStore.get(htmlOutputCookieKey);
			},

			saveHtmlToCookie = function (html) {
				$cookieStore.put(htmlOutputCookieKey, html);
			};

		return {
			getHtmlFromCookie: getHtmlFromCookie,
			saveHtmlToCookie: saveHtmlToCookie
		};
	}]);