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
    .state('results', {
      url: "/results",
      templateUrl: "results.html"
    });
  });


leagueApp.controller('LeagueCtrl', ['$scope', 'Restangular', '$state', '$modal', function($scope, Restangular, $state, $modal) {

  $scope.leagueID = null;
  $scope.day = {};
  $scope.game = {};
  $scope.stat = {};
  $scope.leagueTeams = [];
  $scope.leagueDays = [];
  $scope.leagueMonths = [];
  $scope.leagueYears = [];
  $scope.leagueGames = [];
  $scope.currentMonth = null;
  $scope.gameAdd = true;
  $scope.user = Restangular.one('users').get().$object;
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
      Restangular.all('days').post($scope.day).then(function(day) {
        league.days.push(day);
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

  //New Game Modal
  $scope.newGame = function (day, league, dayIndex) {
    console.log(dayIndex);
    var modalInstance = $modal.open({
      templateUrl: 'game_new.html',
      controller: GameNewCtrl,
      // size: 'md',
      resolve: {
        league: function () {
          return league;
        },
        day: function () {
          return day;
        },
        dayIndex: function () {
          return dayIndex;
        }
      }
    });
  };
  //New Day Modal Controller
  var GameNewCtrl = function ($scope, $modalInstance, league, day, dayIndex) {
    $scope.day = day;
    $scope.game = {};
    $scope.game.day_id = day.id;
    $scope.game.date = day.date;
    $scope.game.home_score = 0;
    $scope.game.away_score = 0;
    $scope.league = league;
    // console.log($scope.game);
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.saveGame = function() {
      Restangular.all('games').post($scope.game).then(function(game) {
        //The Day index is the index after sorting, so I have to re-sort the league days (by parsing the dates into integers) to insert the game into the right index on the scope:
        league.days.sort(function(a,b){
          return parseInt(a.date.split('-')[0] + a.date.split('-')[1] + a.date.split('-')[2]) - parseInt(b.date.split('-')[0] + b.date.split('-')[1] + b.date.split('-')[2]);
        })[dayIndex].games.push(game);

        $modalInstance.dismiss('cancel');
        $scope.game = {};
      }, function(errors) {
          $scope.errors = errors.data;
        });
    };
  };

  //Edit Game Modal
  $scope.editGame = function (game, league) {
    var modalInstance = $modal.open({
      templateUrl: 'game_edit.html',
      controller: GameEditCtrl,
      resolve: {
        game: function () {
          return game;
        },
        league: function () {
          return league;
        }
      }
    });
  };
  //Edif Game Modal Controller
  var GameEditCtrl = function ($scope, $modalInstance, game, league) {
    // console.log(league);
    $scope.game = game;
    $scope.league = league;
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.updateGame = function(game){
      //Add determine winner function
      Restangular.restangularizeElement(null, game, 'games');
      game.put().then(function(){
        $scope.game = {};
        $modalInstance.dismiss('cancel');
      }, function(errors) {
          $scope.errors = errors.data;
        });
    };
  };

  $scope.setStats = function(players, game) {
    $scope.gamePlayers = players;
    $scope.statGame = game;
  };

  //New Stat Modal
    $scope.newStat = function (player, game) {
    var modalInstance = $modal.open({
      templateUrl: 'basketball_stat_new.html',
      controller: bbStatNewCtrl,
      size: 'sm',
      resolve: {
        player: function () {
          return player;
        },
        game: function () {
          return game;
        }
      }
    });
  };
  //New Stat Modal Controller
  var bbStatNewCtrl = function ($scope, $modalInstance, game, player) {
    $scope.player = player;
    $scope.stat = {};
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.saveStat = function() {
      $scope.stat.game_id = game.id;
      $scope.stat.player_id = player.id;
      Restangular.all('stats').post($scope.stat).then(function(newStat) {
        player.stats.push(newStat);
        $modalInstance.dismiss('cancel');
        $scope.stat = {};
      }, function(errors) {
          $scope.errors = errors.data;
        });
    };
  };

  //Determining the win percentage of each team for standings sort
  $scope.winPercent = function(team) {
    if(team.wins>0 && team.losses===0){
      return -team.wins;
    }
    else if(team.wins>0){
      return -team.wins/(team.wins+team.losses);
    }
    else if(team.wins===0 && team.losses>0){
      return team.losses;
    }
    else{
      return 50000;
    }
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

