'use strict';

/* Controllers */
//var API_URL = "http://localhost:9000/api/";
var MAPPING_TYPE_CLASS = {L: "success", C: "primary", CA: "info", CE: "warning", LM: "error"};
var API_URL = "http://dailyoj.herokuapp.com:80/api/";
var SPINNER_DELAY = '100'; //in ms
var dailyOjApp = angular.module('dailyOjApp', ['ngAnimate'], function($locationProvider) {
  $locationProvider.html5Mode(true);
});


dailyOjApp.controller('DailyOjListCtrl', ['$scope', '$http', '$filter','$timeout', function ($scope, $http, $filter,$timeout) {

  $scope.sortField = 'number';
  $scope.date = new Date();

  $scope.getOjs=function(date) {
    $scope.error = false;
    $scope.loading = true;
    $timeout(function() {
      if($scope.loading) {
        $scope.ajax = true;
      }
    }, SPINNER_DELAY);
    $http.get(API_URL+'oj/date/'+$filter('date')($scope.date, 'yyyy-MM-dd')).success(function(data) {
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
   }).error(function(data){
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
 $scope.getOjClass = function(oj) {
  if(!oj) {
    return 'error';
  }
  var resultClass = MAPPING_TYPE_CLASS[oj.type];
  if (resultClass) {
    return resultClass;
  } else {
    return 'error';
  }
}

$scope.getOjs($scope.date);

$scope.selectoj=function(oj) {
 delete $scope.selectedexpression;
 $scope.selectedoj = oj;
}

$scope.selectexpression=function(expression) {
  $scope.selectedexpression = expression;
}

$scope.before=function() {
 $scope.clear();
 $scope.date = dateFromString($scope.previousDateWithOjs);
 $scope.getOjs($scope.date);
}

$scope.after=function() {
 $scope.clear();
 $scope.date = dateFromString($scope.nextDateWithOjs);
 $scope.getOjs($scope.date);
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
var date1 = new Date(yr1, mon1-1, dt1);
return date1;
}