'use strict';

/* Services */
var dailyOjServices = angular.module('dailyOjServices', ['ngResource']);

//var API_URL = "http://openlaw-api.eu/api/";
var API_URL = "http://localhost:9000/api/";

dailyOjServices.factory('Ojs', ['$resource',
  function($resource){
    return $resource(API_URL+'oj/date/:date', {}, {
      query: {method:'GET'}
    });
  }]);

dailyOjServices.factory('OjStats', ['$resource',
  function($resource){
    return $resource(API_URL+'oj/stats', {}, {
      query: {method:'GET'}
    });
  }]);
