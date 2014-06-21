var leagueApp = angular.module('leagueapp', ['ngResource', 'ui.router', 'templates', 'restangular', 'ui.bootstrap']).config(
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
  $scope.day = {};
  $scope.game = {};
  $scope.leagueTeams = [];
  $scope.leagueDays = [];
  $scope.leagueMonths = [];
  $scope.leagueYears = [];
  $scope.leagueGames = [];
  $scope.formShow = false;
  var months = [
    {number:1, name:"January"},
    {number:2, name:"February"},
    {number:3, name:"March"},
    {number:4, name:"April"},
    {number:5, name:"May"},
    {number:6, name:"June"},
    {number:7, name:"July"},
    {number:8, name:"August"},
    {number:9, name:"September"},
    {number:10, name:"October"},
    {number:11, name:"November"},
    {number:12, name:"December"}
  ];

  $scope.today = function() {
    $scope.day.date = new Date();
    $scope.dateToday = new Date();
  };
  $scope.today();

  $scope.setLeague = function(id) {
    $scope.leagueID = id;
    //active model serializer embeds IDs of teams, so I have to loop through the array of IDs to save all of the teams that belong to a league
    Restangular.one('leagues', id).get().then(function(league){
      $scope.league = league;
      var startYear = league.start_date.split('-')[0];
      var startMonth = league.start_date.split('-')[1]-1;
      var endYear = league.end_date.split('-')[0];
      var endMonth = league.end_date.split('-')[1]-1;
      for(i=startYear; i<=endYear; i++){
        for(j=0; j<12; j++){
          if(startYear==endYear){
            if(j>=startMonth && j<=endMonth){
              $scope.leagueMonths.push([months[j], i]);
            }
          }
          else if(j>=startMonth && i==startYear){
            $scope.leagueMonths.push([months[j], i]);
          }
          else if(endYear>i>startYear){
            $scope.leagueMonths.push([months[j], i]);
          }
          else if(j<=endMonth && i==endYear){
            $scope.leagueMonths.push([months[j], i]);
          }
        }
      }
      // }
      // get teams that belong to this league
      // for(i=0;i<league.team_ids.length;i++){
      //   $scope.leagueTeams.push(league.one('teams', league.team_ids[i]).get().$object);
      // }
    });
  };

  $scope.saveDay = function(league) {
    $scope.day.league_id = league.id;
    Restangular.all('days').post($scope.day).then(function() {
      console.log($scope.day);
      $scope.league.days.push($scope.day);
      $scope.today();
    }, function(errors) {
        $scope.errors = errors.data;
      });
  };

  $scope.saveGame = function(dayID, dayIndex) {
    $scope.game.day_id = dayID;
    $scope.game.home_score = 0;
    $scope.game.away_score = 0;
    Restangular.all('games').post($scope.game).then(function(){
      $scope.league.days[dayIndex].games.push($scope.game);
      $scope.game = {};
    });
  };

  $scope.deleteLeagueTeam = function(team){
    // get all league_teams
    Restangular.all('league_teams').getList().$object.then(function(leagueTeams){
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

// $scope.setDays = function(id) {
  //   $scope.leagueDays = [];
  //   //get days that belong to this league
  //   Restangular.one('leagues', id).get().then(function(league){
  //     //get teams that belong to this league
  //     for(i=0;i<league.day_ids.length;i++){
  //       $scope.leagueDays.push(league.one('days', league.day_ids[i]).get().$object);
  //     }
  //   });
  // };

  // $scope.setGames = function(id) {
  //   $scope.leagueGames = [];
  //   //get days that belong to this league
  //   Restangular.one('leagues', id).get().then(function(league){
  //     //get teams that belong to this league
  //     for(i=0;i<league.game_ids.length;i++){
  //       $scope.leagueGames.push(league.one('games', league.game_ids[i]).get().$object);
  //     }
  //   });
  // };

}]);

