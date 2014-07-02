var visitorApp = angular.module('visitorApp', ['restangular', 'ui.bootstrap']).config(
    ['$httpProvider', function($httpProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;
    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]).controller('VisitorsCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

	Restangular.all('teams').all('allTeams').getList().then(function(teams){
		$scope.teams = teams;
	});

	Restangular.all('leagues').all('allLeagues').getList().then(function(leagues){
		$scope.leagues = leagues;
	});

}]);