// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Trippin', ['ionic','app.controllers','app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
  $stateProvider.state("tabs",{
    url:"/home",
    abstract:true,
    templateUrl:"/partials/tabs.html"
  })
  .state("tabs.destinations",{
    url:"/destinations",
    views:{
      "Destinations":{
        templateUrl:"/partials/destinations.html",
        resolve:{
          data:function(DataService){
            return DataService;
          }
        },
        controller:function($scope,data){
          $scope.data = data.data;
        }
      }
    }
  })
  .state("tabs.city",{
    url:"/destinations/:city",
    views:{
      "Destinations":{
        templateUrl:"/partials/city.html",
        resolve:{
          countries:function(DataService){
            return DataService;
          }
        },
 controller:function($scope,$stateParams,countries){
          countries.data.forEach(function(country){
            country.cities.forEach(function(city){
              if(city.name == $stateParams.city)
                $scope.city = city;
            });
          });
        }
      }
    }
  })
 $urlRouterProvider.otherwise("/home/destinations");
}])