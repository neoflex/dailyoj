'use strict';

/* Filters */
var MAPPING_TYPE_CLASS = {L: "success", C: "primary", CA: "info", CE: "warning", LM: "error"};

var dailyOjFilters = angular.module('dailyOjFilters', []).filter('classForOj', function() {
return function(oj) {
  if(!oj) {
    return 'error';
  }
  var resultClass = MAPPING_TYPE_CLASS[oj.type];
  if (resultClass) {
    return resultClass;
  } else {
    return 'error';
  }
};
});