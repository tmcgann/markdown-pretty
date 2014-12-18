print.controller('printController', ['$scope', '$log', '$sce', 'storeService',
	function ($scope, $log, $sce, storeService) {
		$scope.htmlOutput = getHtml();

		function getHtml() {
			return storeService.getHtml();
		}
	}]);