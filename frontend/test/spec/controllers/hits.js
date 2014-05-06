'use strict';

describe('Controller: HitsCtrl', function () {

  // load the controller's module
  beforeEach(module('informant'));

  var HitsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HitsCtrl = $controller('HitsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
