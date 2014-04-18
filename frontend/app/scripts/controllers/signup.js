'use strict';

angular.module('informant')
  .controller('SignupCtrl', function ($scope) {

    // Which part of the signup process are we on?
    var TWITTER_AUTH = 0;
        // PAYMENTS = 1;

    $scope.signupState = TWITTER_AUTH;
  });
