print.controller('printController', ['$scope', '$log', '$sce', 'cookieService',
	function ($scope, $log, $sce, cookieService) {
		$scope.htmlOutput = getHtml();

		function getHtml() {
			return cookieService.getHtmlFromCookie();
		}
	}]);