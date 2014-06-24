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
    })
    .state('standings', {
      url: "/standings",
      templateUrl: "standings.html"
    });
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


leagueApp.controller('LeagueCtrl', ['$scope', 'Restangular', '$state', '$modal', function($scope, Restangular, $state, $modal) {

  $scope.leagueID;
  $scope.day = {};
  $scope.game = {};
  $scope.leagueTeams = [];
  $scope.leagueDays = [];
  $scope.leagueMonths = [];
  $scope.leagueYears = [];
  $scope.leagueGames = [];
  $scope.currentMonth = null;
  $scope.gameAdd = true;
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
    var today = new Date();
    var day = (today.getDate()).toString();
    var month = (today.getMonth()+1).toString();
    var year = (today.getFullYear()).toString();
    $scope.currentMonth = month;
    $scope.dateToday = parseInt(year+('0' + month).slice(-2)+('0' + day).slice(-2));
    $scope.day.date = today;
  };
  $scope.today();

  $scope.dayInt = function(date) {
    return parseInt(date.split('-')[0] + date.split('-')[1] + date.split('-')[2]);
  };

  $scope.setLeague = function(id) {
    $scope.leagueID = id;
    //active model serializer embeds IDs of teams, so I have to loop through the array of IDs to save all of the teams that belong to a league
    Restangular.one('leagues', id).get().then(function(league){
      $scope.league = league;
      //This block is finding all of the unique months between the start date and end date, taking into account year transitions
      var startYear = league.start_date.split('-')[0];
      var startMonth = league.start_date.split('-')[1]-1;
      var endYear = league.end_date.split('-')[0];
      var endMonth = league.end_date.split('-')[1]-1;
      for(i=startYear; i<=endYear; i++){
        for(j=0; j<12; j++){
          if(startYear==endYear){
            if(j>=startMonth && j<=endMonth){
              //months[j] = current month in the loop, i = current year in the loop
              $scope.leagueMonths.push([months[j], i]);
            }
          }
          //if the start year and end year are different, add month after the start month in the first year and month before the end month in the last year. Add all of the months for years in between if the league persists over several years
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
    });
  };

  //New Day Modal
  $scope.newDay = function (league) {
    var modalInstance = $modal.open({
      templateUrl: 'day_new.html',
      controller: DayNewCtrl,
      size: 'sm',
      resolve: {
        league: function () {
          return league;
        }
      }
    });
  };
  //New Day Modal Controller
  var DayNewCtrl = function ($scope, $modalInstance, league) {
    $scope.league = league;
    $scope.day = {};
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.saveDay = function() {
      $scope.day.league_id = league.id;
      Restangular.all('days').post($scope.day).then(function(leagues) {
        var currentLeague = {};
        //Restangular returns all of the leagues for this user, so we have to find the current league with this loop
        for(i=0;i<leagues.length;i++){
          if(leagues[i].id == league.id){
            currentLeague = leagues[i];
          }
        }
        //Finding the most recently added day from the current league and pushing it onto the scope
        var daysSorted = currentLeague.days.sort(function(a,b){return a.id - b.id});
        league.days.push(daysSorted[daysSorted.length-1]);
        $modalInstance.dismiss('cancel');
        $scope.day = {};
      }, function(errors) {
          $scope.errors = errors.data;
        });
    };
  };

  $scope.deleteDay = function(day) {
    Restangular.restangularizeElement(null, day, 'days');
    day.remove().then(function() {
      $scope.league.days = _.without($scope.league.days, day);
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

  $scope.editGame = function(game) {
    $scope.gameAdd = false;
    $scope.game = game;
  };

  $scope.updateGame = function(game){
    Restangular.restangularizeElement(null, game, 'games');
    game.put().then(function(){
      $scope.game = {};
      $scope.playerAdd = true;
    }, function(errors) {
        $scope.errors = errors.data;
      });
  };

  //Removing teams from your league
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

}]);

