'use strict';
/* jshint unused:false*/
var scrollToBottom;

angular.module('informant')
  .controller('MakehitCtrl', function ($scope) {

    $scope.user = {};

    // Make sure we're logged in.
    $.getJSON("/me", function(data) {
      console.log(data);
      if (!data || !data.loggedIn) {
        $scope.$apply(function(){
          $location.path("/");
        });
      } else {
        $scope.$apply(function() {
          $scope.user = data.user;
        });
      }

    });



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
