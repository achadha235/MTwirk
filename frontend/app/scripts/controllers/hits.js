'use strict';

angular.module('informant')
  .controller('HitsCtrl', function ($scope, $location) {
    $.getJSON("/me", function(data) {
      console.log(data);
      if (!data || !data.loggedIn) {
        console.log("Redirecting...");
        $scope.$apply(function(){
          $location.path("/");
        });
      }
    });

  });
