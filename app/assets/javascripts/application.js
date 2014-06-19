// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require angular
//= require angular-resource
//= require angular-rails-templates
//= require lodash
//= require_tree ./templates
//= require_tree .


var leagueApp = angular.module('leagueapp', ['ngResource', 'ui.router', 'templates', 'restangular']).config(
    ['$httpProvider', 'RestangularProvider', function($httpProvider, RestangularProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;
    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]).config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /teams
  $urlRouterProvider.otherwise("/league");
  // Now set up the states
  $stateProvider
    .state('league', {
      url: "/league",
      templateUrl: "userLeague.html"
    });
    // .state('teams', {
    //   url: "/teams",
    //   templateUrl: "teams.html"
    // })
    // .state('players', {
    //   url: "/players",
    //   templateUrl: "players.html"
    // })
    // .state('new-player', {
    //   url: "/new-player",
    //   templateUrl: "player_form.html"
    // });
    // RestangularProvider.setBaseUrl('localhost:3000/');
    // RestangularProvider.setRequestSuffix('.json');
  });


leagueApp.controller('LeagueCtrl', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {

  $scope.leagueID;

  $scope.setLeague = function(id) {
    $scope.leagueID = id;
    $scope.leagueTeams = [];
    $scope.leagueDays = [];
    //active model serializer embeds IDs of teams, so I have to loop through the array of IDs to save all of the teams that belong to a league
    Restangular.one('leagues', id).get().then(function(league){
      $scope.league = league;
      //get teams that belong to this league
      for(i=0;i<league.team_ids.length;i++){
        league.one('teams', league.team_ids[i]).get().then(function(team){
          $scope.leagueTeams.push(team);
        });
      }
      //get days that belong to this league
      for(i=0;i<league.day_ids.length;i++){
        league.one('days', league.day_ids[i]).get().then(function(day){
          console.log(day);
          $scope.leagueDays.push(day);
        });
      }
    });

  };



  $scope.deleteLeagueTeam = function(team){
    // get all league_teams
    Restangular.all('league_teams').getList().then(function(leagueTeams){
      //loop through the league_teams
      for(i=0;i<leagueTeams.length;i++){
        var leagueTeam = leagueTeams[i];
        //if the team and league id match, delete that league_team record
        if((leagueTeam.team_id == team.id) && (leagueTeam.league_id == $scope.leagueID)){
          leagueTeam.remove().then(function(){
            //remove the team from the scope
            $scope.leagueTeams= _.without($scope.leagueTeams, team);
            return;
          });
        }
      }
    });
  };


}]);





var teamApp = angular.module('teamapp', ['ngResource', 'ui.router', 'templates', 'restangular']).config(
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

  $scope.user = Restangular.one('users', 1).get().$object;
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
    Restangular.one('teams', id).all('players').getList().then(function(players){
      $scope.players = players;
    });
  };

  $scope.savePlayer = function() {
    $scope.team.post('players', $scope.player).then(function() {
      Restangular.one('teams', $scope.teamID).all('players').getList().then(function(players){
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







