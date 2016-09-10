// Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);
//Routes
weatherApp.config(function ($routeProvider) {
        $routeProvider
            
            .when('/', {
            templateUrl: 'pages/home.html'
            , controller: 'homeController'
        })
    .when('/forcast', {
            templateUrl: 'pages/forcast.html'
            , controller: 'forcastController'
        })
        
          .when('/forcast/:days', {
            templateUrl: 'pages/forcast.html'
            , controller: 'forcastController'
        })
    })


//Services

weatherApp.service('cityService', function(){
    this.city= 'New York, NY';
})

    //Controllers
weatherApp.controller('homeController', ['$scope' , 'cityService', function ($scope, cityService)
    {
        $scope.city = cityService.city;
        
        $scope.apikey = 'f8bc899355b4f284b9f0fca37be4e4d3'
        $scope.$watch('city', function(){
            cityService.city = $scope.city;
        });
    }]);
weatherApp.controller('forcastController', ['$scope' , 'cityService' ,'$resource', '$routeParams', function ($scope, cityService , $resource, $routeParams)
    {
                $scope.days = $routeParams.days || '2';
                $scope.city = cityService.city;
        $scope.apikey = 'f8bc899355b4f284b9f0fca37be4e4d3'
                $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
                    callback:"JSON_CALLBACK"
                },
                                             {
                    get: { method: "JSONP" }
                });
        
        $scope.weatherResult = $scope.weatherAPI.get({ appid: $scope.apikey , cnt: $scope.days, q: $scope.city }) ;

     $scope.converttoF = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    }
     $scope.converttoDate = function(dt) {
         return new Date(dt*1000);
    }
    
    
    }]);