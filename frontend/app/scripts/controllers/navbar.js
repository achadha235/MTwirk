'use strict';

angular.module('informant')
  .controller('NavbarCtrl', function ($scope, $location) {

    $scope.menuItems = [
      'Home','About', 'Login'
    ];

    $scope.isActive = function(location) {
      return location === $location.path();
    };

  });
