'use strict';
/* jshint unused:false*/
var scrollToBottom;

angular.module('informant')
  .controller('MakehitCtrl', function ($scope, $location) {

    $scope.user = {};

    // Make sure we're logged in.
    $.getJSON('/me', function(data) {
      console.log(data);
      if (!data || !data.loggedIn) {
        $scope.$apply(function(){
          $location.path('/');
        });
      } else {
        $scope.$apply(function() {
          $scope.user = data.user;
        });
      }
    });

    // Make it twirk
    $scope.makeHit = function() {
      var newTask = {
        owner: $scope.user._id,
        numTasks: $scope.numTasks,
        reward: $scope.reward,
        approvalDelay: 86400, // 1 day
        description: $scope.description,
        type: $scope.type
      };

      $.post('/api/task', newTask, function(data) {
        console.log(data);
      });
    };


    // Get height of body in different browsers
    var getDocHeight = function () {
      return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
    };

    var scrollToTop = function(element, to, duration) {
      if (duration <= 0) { return; }

      var difference = to - element.scrollTop;
      var perTick = difference / duration * 5;

      setTimeout(function () {
        element.scrollTop = element.scrollTop + perTick;
        scrollToTop(element, to, duration - 5);
      }, 5);
    };

    scrollToBottom = function() {
      scrollToTop(window.document.body, getDocHeight(), 350);
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
