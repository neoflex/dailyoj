'use strict';
var dailyOjApp = angular.module('dailyOjApp', [
	'ngRoute',
	'dailyOjServices',
	'dailyOjControllers',
	'dailyOjFilters'
]);


dailyOjApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/date/:date', {
        templateUrl: 'partials/ojsForHtml.html',
        controller: 'DailyOjListCtrl'
      }).
      when('/', {
        templateUrl: 'partials/ojsForHtml.html',
        controller: 'DailyOjRedirectCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
