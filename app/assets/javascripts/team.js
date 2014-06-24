
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
    });
    // RestangularProvider.setBaseUrl('localhost:3000/');
    // RestangularProvider.setRequestSuffix('.json');
  });


teamApp.controller('TeamsCtrl', ['$scope', 'Restangular', '$state', '$modal', function($scope, Restangular, $state, $modal) {

  $scope.user = Restangular.one('users').get().$object;
  $scope.leagues = Restangular.all('leagues').getList().$object;
  $scope.playerAdd = true;
  $scope.teamID = null;

  $scope.setTeam = function(id) {
    $scope.teamID = id;
    $scope.teamLeagues = [];
    //Set the current team then get all of the leagues that this team belongs to through the LeagueTeam join table
    Restangular.one('teams', id).get().then(function(team){
      $scope.team = team;
      for(i=0;i<team.league_ids.length;i++){
        Restangular.one('leagues', team.league_ids[i]).get().then(function(league){
          $scope.teamLeagues.push(league);
        });
      }
    });
  };

  //New Player Modal
  $scope.newPlayer = function (players) {
    var modalInstance = $modal.open({
      templateUrl: 'player_new.html',
      controller: PlayerNewCtrl,
      size: 'sm',
      resolve: {
        players: function () {
          return players;
        }
      }
    });
  };
  //New Player Controller
  var PlayerNewCtrl = function ($scope, $modalInstance, players) {
    $scope.player = {};
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.savePlayer = function() {
      Restangular.all('players').post($scope.player).then(function(team) {
        //pushing the last element of the response (the newest player) onto the scope. I had to sort by ID first because they are returned sorted by last name
        var playersSorted = team.players.sort(function(a,b){return a.id - b.id});
        players.push(playersSorted[playersSorted.length-1]);
        $scope.player = {};
        $modalInstance.dismiss('cancel');
      }, function(errors) {
          $scope.errors = errors.data;
        });
    };
  };

  //Edit Player Modal
  $scope.editPlayer = function (player) {
    var modalInstance = $modal.open({
      templateUrl: 'player_edit.html',
      controller: PlayerEditCtrl,
      size: 'sm',
      resolve: {
        player: function () {
          return player;
        }
      }
    });
  };
  //Edif Player Modal Controller
  var PlayerEditCtrl = function ($scope, $modalInstance, player) {
    $scope.player = player;
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.updatePlayer = function(player){
      Restangular.restangularizeElement(null, player, 'players');
      player.put().then(function(){
        $scope.player = {};
        $modalInstance.dismiss('cancel');
      }, function(errors) {
          $scope.errors = errors.data;
        });
    };
  };

  //I had to 'restangularize' the player object before deleting
  $scope.deletePlayer = function(player) {
    Restangular.restangularizeElement(null, player, 'players');
    player.remove().then(function() {
      $scope.team.players = _.without($scope.team.players, player);
    });
  };

  $scope.saveLeagueTeam = function(teamID, league){
    var newLeagueTeam = {team_id:teamID, league_id:league.id};
    Restangular.all('league_teams').post(newLeagueTeam).then(function(){
      $scope.teamLeagues.push(league);
      $state.go('teams');
    });
  };
  
}]);


