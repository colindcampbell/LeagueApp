describe('Controller: TeamsCtrl', function () {
  var scope, fakeResource, spy;
  beforeEach(module('teamapp', function($provide){
    fakeResource = {
      users: {
        name: 'Bob',
        email: 'bob@bob.com'
      },
      leagues: [
        {

        },
        {

        }
      ]
    };
    mockRestangular = {
      one: function(resource) {
        return {
          get: function() {
            return {
              $object: fakeResource[resource]
            };
          }   
        }; 
      },
      all: function(resource) {
        return {
          getList: function() {
            return {
              $object: fakeResource[resource]
            };
          }   
        }; 
      }
    }
    /*fakeTeam = [{
      id: 7,
      name: "The Pumpkin Eaters",
      home_city: "Ventura, CA",
      mascot: "The Great Pumpkin",
      user_id: 7,
      wins: 0,
      losses: 0,
      league_ids: [2,3,4,5,6,1,8,9],
      players: [
        {
          id: 104,
          first_name: "Colin",
          last_name: "Campbell",
          number: 43,
          position: "SG",
          height: "6' 3",
          weight: 210
        },
        {
          id: 107,
          first_name: "Caitlin",
          last_name: "Kearns",
          number: 35,
          position: "C",
          height: "6' 3",
          weight: 170
        },
        {
          id: 135,
          first_name: "Mike",
          last_name: "Murray",
          number: 24,
          position: "SG",
          height: "6' 0",
          weight: 165
        },
        {
          id: 111,
          first_name: "Nick",
          last_name: "Palmer",
          number: 41,
          position: "PF",
          height: "6' 3",
          weight: 195
        },
        {
          id: 133,
          first_name: "JD",
          last_name: "Schleppenbach",
          number: 32,
          position: "PF",
          height: "6' 3",
          weight: 205
        }
      ]
    }];*/

    /*var fakePlayer = function(){
      this.first_name = "Michael";
      this.last_name = "Jordan";
      this.number = 23;
      this.position = "SG";
      this.height = "6' 6";
      this.weight = 225;
    };*/
    //fakePlayer.query =  function(callback) {
    //    callback(fakeTeam);
    //};

    $provide.value("Restangular", mockRestangular);

  }));

  beforeEach(inject(function ($controller, $rootScope, Restangular) {
    scope = $rootScope.$new();
    console.log(Restangular.one);
    spy = spyOn(Restangular, "one");
    spy.and.callThrough();
    $controller('TeamsCtrl', { $scope: scope, Restangular: Restangular});
  }));

    it('playerAdd is present', function () {
      expect(scope.playerAdd).toEqual(true);
    });

    it('calls Restangular One with Users', function() {
      expect(spy).toHaveBeenCalledWith('users');
    });

    it('sets the user', function() {
      expect(scope.user.email).toEqual("bob@bob.com")
    });

    // it('should be able to clear out all the errors', function(){
    //   scope.errors = ['here is an error'];
    //   scope.clearErrors();
    //   expect(scope.errors).toEqual(null);
    // });
});

