'use strict';

angular.module('informant')
  .controller('HitsCtrl', function ($scope, $location) {

    $scope.user = {};
    $scope.active = [];
    $scope.completed = [];

    $.getJSON('/me', function(data) {
      console.log(data);
      if (!data || !data.loggedIn) {
        console.log('Redirecting...');
        $scope.$apply(function(){
          $location.path('/');
        });
      } else {
        // Time 4 sum callback hell
        $.getJSON('/api/user/' + data.user._id, function(user) {
          $scope.$apply(function() {
            console.log('User we got', user);
            $scope.user = user;
          });
        });
      }
    });



  });
