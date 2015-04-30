'use strict';

/* Services */
var dailyOjServices = angular.module('dailyOjServices', ['ngResource']);

var API_URL = "http://openlaw-api.eu/api/";

dailyOjServices.factory('Ojs', ['$resource',
  function($resource){
    return $resource(API_URL+'oj/date/:date', {}, {
      query: {method:'GET'}
    });
  }]);
