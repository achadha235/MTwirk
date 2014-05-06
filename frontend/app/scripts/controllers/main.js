'use strict';

angular.module('informant')
  .controller('MainCtrl', function ($scope, $location) {
    $.getJSON('/me', function(data) {
    if (data && data.loggedIn) {
      $scope.$apply(function(){
        $location.path('/hits');
      });
    }
  }); });
