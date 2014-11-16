'use strict';
var dailyOjApp = angular.module('dailyOjApp', [
	'ngRoute',
	'dailyOjServices',
	'dailyOjControllers',
	'dailyOjFilters'
]);


dailyOjApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/date/:date', {
        templateUrl: 'partials/ojsForHtml.html',
        controller: 'DailyOjListCtrl'
      }).
      when('/', {
        templateUrl: 'partials/ojsForHtml.html',
        controller: 'DailyOjListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
