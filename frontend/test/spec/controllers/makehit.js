'use strict';

describe('Controller: MakehitCtrl', function () {

  // load the controller's module
  beforeEach(module('informant'));

  var MakehitCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MakehitCtrl = $controller('MakehitCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
