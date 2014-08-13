(function(angular){
'use strict';

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/agenda', {
      templateUrl: 'expose/agenda/list',
      controller: 'ContactListController'
    }).
    when('/agenda/create', {
      templateUrl: 'expose/agenda/create',
      controller: 'ContactCreateController'
    }).
    when('/agenda/:id', {
      templateUrl: 'expose/agenda/show',
      controller: 'ContactShowController'
    }).
    when('/agenda/:id/edit', {
      templateUrl: 'expose/agenda/edit',
      controller: 'ContactEditController'
    }).
    when('/agenda/:id/remove', {
      templateUrl: 'expose/agenda/remove',
      controller: 'ContactRemoveController'
    }).
    otherwise({
      redirectTo: '/agenda'
    });
  $locationProvider.html5Mode(true);
}]);
})(angular);
