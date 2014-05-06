'use strict';

angular.module('informant')
  .controller('ResultsCtrl', function ($scope, $location, $routeParams) {

    $scope.task = {};
    $scope.results = [];

    $.getJSON("/me", function(data) {
      if (!data || !data.loggedIn) {
        console.log("Redirecting...");
        $scope.$apply(function(){
          $location.path("/");
        });
      }
    });

    $.getJSON('/api/v1/task/' + $routeParams.result + "?populate=results", function (data) {
      console.log(data);
      if (data) {
        $scope.$apply(function(){
          $scope.task = data;
        });
      }
      if (data.results) {
        data.results.forEach(function(id, idx) {
          $.getJSON('/api/v1/task')
        });
      };
    });



  });
