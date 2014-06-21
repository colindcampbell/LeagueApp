var teamApp = angular.module('teamapp', ['ngResource', 'ui.router', 'templates', 'restangular', 'ui.bootstrap']).config(
    ['$httpProvider', 'RestangularProvider', function($httpProvider, RestangularProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;
    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]).config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /teams
  $urlRouterProvider.otherwise("/teams");
  // Now set up the states
  $stateProvider
    .state('leagues', {
      url: "/leagues",
      templateUrl: "leagues.html"
    })
    .state('teams', {
      url: "/teams",
      templateUrl: "teams.html"
    })
    .state('players', {
      url: "/players",
      templateUrl: "players.html"
    })
    .state('new-player', {
      url: "/new-player",
      templateUrl: "player_form.html"
    });
    // RestangularProvider.setBaseUrl('localhost:3000/');
    // RestangularProvider.setRequestSuffix('.json');
  });


teamApp.controller('TeamsCtrl', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {

  $scope.user = Restangular.one('users').get().$object;
  $scope.leagues = Restangular.all('leagues').getList().$object;
  $scope.playerAdd = true;
  $scope.editing = false;
  $scope.teamID;

  $scope.setTeam = function(id) {
    $scope.teamID = id;
    $scope.teamLeagues = [];
    
    Restangular.one('teams', id).get().then(function(team){
      $scope.team = team;
      for(i=0;i<team.league_ids.length;i++){
        Restangular.one('leagues', team.league_ids[i]).get().then(function(league){
          $scope.teamLeagues.push(league);
        });
      }
    });
    Restangular.all('players').getList().then(function(players){
      $scope.players = players;
    });
  };

  $scope.savePlayer = function() {
    Restangular.all('players').post($scope.player).then(function() {
      Restangular.all('players').getList().then(function(players){
        $scope.players = players;
      });
      $scope.playerAdd = true;
      $scope.editing = false;
      $scope.player = {};
    }, function(errors) {
        $scope.errors = errors.data;
      });
  };

  $scope.deletePlayer = function(player) {
    player.remove().then(function() {
      $scope.players = _.without($scope.players, player);
    });
  };

  $scope.editPlayer = function(player) {
    $scope.editing = true;
    $scope.playerAdd = false;
    $scope.player = player;
  };

  $scope.updatePlayer = function(player){
    player.put().then(function(){
      $scope.player = {};
      $scope.playerAdd = true;
      $scope.editing = false;
    }, function(errors) {
        $scope.errors = errors.data;
      });
  };

  $scope.newPlayer = function(){
    $scope.player = {};
    $scope.playerAdd = true;
    $scope.editing = false;
  };

  $scope.saveLeagueTeam = function(teamID, league){
    var newLeagueTeam = {team_id:teamID, league_id:league.id};
    Restangular.all('league_teams').post(newLeagueTeam).then(function(){
      $scope.teamLeagues.push(league);
      $state.go('teams');
    });
  };
  
}]);
