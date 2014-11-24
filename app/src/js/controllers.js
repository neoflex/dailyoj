'use strict';

/* Controllers */
//var API_URL = "http://localhost:9000/api/";
var SPINNER_DELAY = '100'; //in ms

var dailyOjControllers = angular.module('dailyOjControllers', []);

dailyOjControllers.controller('DailyOjRedirectCtrl', ['$scope', 'Ojs', '$http', '$filter','$timeout','$routeParams','$location',
  function ($scope, Ojs, $http, $filter, $timeout, $routeParams, $location) {
      $scope.redirectTo = function(pDate) {
        var dateString = $filter('date')(pDate, 'yyyy-MM-dd');
        $location.path("/date/"+dateString)
      }
      var today = new Date();
      $scope.redirectTo(today);
 }]);

dailyOjControllers.controller('DailyOjListCtrl', ['$scope', 'Ojs', '$http', '$filter','$timeout','$routeParams','$location', '$rootScope',
  function ($scope, Ojs, $http, $filter, $timeout, $routeParams, $location, $rootScope) {


  $scope.redirectTo = function(pDate) {
    var dateString = $filter('date')(pDate, 'yyyy-MM-dd');
      $location.path("/date/"+dateString)
  }

  if($routeParams.date) {
    $scope.date = dateFromString($routeParams.date);
    if($scope.date == null || $scope.date == "") {
      $location.path("/")
      return;
    } else {
      $rootScope.pageTitle = "Official Journals for "+ $filter('date')($scope.date, 'fullDate');
      $scope.getOjs($scope.date);
    }
  }

  $scope.sortField = 'number';

  $scope.getOjs=function(date) {
    $scope.error = false;
    $scope.loading = true;
    $timeout(function() {
      if($scope.loading) {
        $scope.ajax = true;
      }
    }, SPINNER_DELAY);
    var dateString = $filter('date')(date, 'yyyy-MM-dd');
    $scope.ojs = Ojs.query({date: dateString}, function(data) {
      $scope.loading = false;
      $scope.ajax = false;
      $scope.ojs = data.ojs;
      if(data.previousDateWithOjs) {
        $scope.previousDateWithOjs = data.previousDateWithOjs;
        $scope.first = false;
      } else {
        $scope.first = true;
      }
      if(data.nextDateWithOjs) {
       $scope.nextDateWithOjs = data.nextDateWithOjs;
       $scope.last = false;
     } else {
      $scope.last = true;
     }
   }, function(error){
    $scope.error = true;
    $scope.loading = false;
    $scope.ajax = false;
  });
 }

 $scope.getTitle = function() {
  if($scope.selectedexpression && $scope.selectedexpression.title) {
    return $scope.selectedexpression.title;
  } else {
    if($scope.selectedoj && $scope.selectedoj.shortId) {
      return "Official Journal of the European Union, "+$scope.selectedoj.shortId+", "+$filter('date')($scope.date,'d MMMM y');
    } else {
      return "";
    }
  }
 }



$scope.selectoj=function(oj) {
 delete $scope.selectedexpression;
 $scope.selectedoj = oj;
}

$scope.selectexpression=function(expression) {
  $scope.selectedexpression = expression;
}

$scope.clear=function() {
  delete $scope.ojs;
  delete $scope.selectedexpression;
  delete $scope.selectedoj;
}

}]);

function dateFromString(str1){
  // str1 format should be yyyy-MM-dd. Separator can be anything e.g. / or -. It wont effect
  if(!str1) return new Date();
    var dt1   = parseInt(str1.substring(8,10));
    var mon1  = parseInt(str1.substring(5,8));
    var yr1   = parseInt(str1.substring(0,4));
    if( !isInt(dt1) || !isInt(mon1) || !isInt(yr1) || mon1 > 11 || dt1 > 31) {
      return null;
    }
    var date1 = new Date(yr1, mon1-1, dt1);
  return date1;
}

function isInt(n) {
   return n % 1 === 0;
}
