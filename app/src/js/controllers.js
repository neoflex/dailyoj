'use strict';

/* Controllers */
//var API_URL = "http://localhost:9000/api/";
var SPINNER_DELAY = '100'; //in ms

var dailyOjControllers = angular.module('dailyOjControllers', []);

dailyOjControllers.controller('DailyOjStatsCtrl',['$scope', 'OjStats', '$http', '$filter', '$timeout', '$rootScope',
  function ($scope, OjStats, $http, $filter, $timeout, $rootScope) {
    $scope.getOjStats=function() {
    $scope.error = false;
    $scope.loading = true;
    $timeout(function() {
      if($scope.loading) {
        $scope.ajax = true;
      }
    }, SPINNER_DELAY);
    $scope.ojStats = OjStats.query(function(data) {
      $scope.loading = false;
      $scope.ajax = false;
      $scope.stats = data;
      $scope.prepareOjsByYear();
      $scope.prepareExprByLanguage();
      $scope.prepareOjsByClass();
    }, function(error){
    $scope.error = true;
    $scope.loading = false;
    $scope.ajax = false;
    });  
  };
  
  $scope.prepareOjsByYear=function() {
    var ojByYearRaw = $scope.stats.ojsByYear;
   
    for (var year in ojByYearRaw) {
      $scope.ojYears.push(year);
      $scope.ojYearsNumber.push(ojByYearRaw[year]);
    }
  }

  $scope.prepareExprByLanguage=function() {
    var expressionsByLanguage = $scope.stats.expressionsByLanguage;   
    for (var langue in expressionsByLanguage) {
      var color = randomColorGeneator();
      $scope.dataExpByLang.push({
        value: expressionsByLanguage[langue],
        label: langue,
        color: color,
        highlight: color
      });
    }
  }

  $scope.prepareOjsByClass=function() {
    var ojsByClass = $scope.stats.ojsByClass;   
    for (var ojClass in ojsByClass) {
      var color = randomColorGeneator();
      $scope.dataOjsClass.push({
        value: ojsByClass[ojClass],
        label: ojClass,
        color: color,
        highlight: color
      });
    }
  }

  $rootScope.page = 'stats';
  $scope.ojYears = [];
  $scope.ojYearsNumber = [];
  $scope.dataExpByLang = [];
  $scope.dataOjsClass = [];

  $scope.innerCutout = 40;
  $scope.getOjStats();

  $scope.dataOjByYear = {
      labels:  $scope.ojYears,
      datasets: [
        {
          label: 'Number of OJ published by year',
          fillColor: 'rgba(0,140,186,0.2)',
          strokeColor: 'rgba(0,140,186,1)',
          pointColor: 'rgba(0,140,186,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: $scope.ojYearsNumber
        }        
      ]
    };
  $scope.optionsOjByYear = { 
      responsive: true,
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      bezierCurve : true,
      bezierCurveTension : 0.4,
      pointDot : true,
      pointDotRadius : 4,
      pointDotStrokeWidth : 1,
      pointHitDetectionRadius : 5,
      datasetStroke : true,
      datasetStrokeWidth : 2,
      datasetFill : true,
      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
  };

    $scope.optionsExpByLang =  {
      responsive: true,
      segmentShowStroke : true,
      segmentStrokeColor : '#fff',
      segmentStrokeWidth : 1,
      percentageInnerCutout : $scope.innerCutout, // This is 0 for Pie charts
      animationSteps : 100,
      animationEasing : 'easeOutBounce',
      animateRotate : true,
      animateScale : false,
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="border-radius:3px; background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };

    $scope.optionsOjsClass = $scope.optionsExpByLang;


 }]);




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

  $rootScope.page = 'home';
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
  $scope.selectedmanifestation = null;
}

$scope.selectmanifestation=function(manifestation) {
  $scope.selectedmanifestation = manifestation;
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
    if( !isInt(dt1) || !isInt(mon1) || !isInt(yr1) || mon1 > 12 || dt1 > 31) {
      return null;
    }
    var date1 = new Date(yr1, mon1-1, dt1);
  return date1;
}

function isInt(n) {
   return n % 1 === 0;
}

var randomColorGeneator = function () { 
    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
};