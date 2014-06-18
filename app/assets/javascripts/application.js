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
  //
  // For any unmatched url, redirect to /teams
  $urlRouterProvider.otherwise("/teams");
  // Now set up the states
  $stateProvider
    // .state('home', {
    //   url: "/home",
    //   templateUrl: "home.html"
    // })
    // .state('newTeam', {
    //   url: "/newTeam",
    //   templateUrl: "team_form.html"
    // })
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




leagueApp.controller('TeamsCtrl', ['$scope', 'Restangular', '$state', '$location', function($scope, Restangular, $state, $location) {

  $scope.user = Restangular.one('users', 1).get().$object;
  $scope.leagues = Restangular.all('leagues').getList().$object;
  $scope.playerAdd = true;
  $scope.editing = false;
  $scope.teamID;

  $scope.setTeam = function(id) {
    $scope.teamID = id;
    Restangular.one('teams', id).get().then(function(team){
      $scope.team = team;
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
    console.log(player);
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
  
}]);





