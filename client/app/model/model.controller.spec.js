'use strict';

describe('Controller: ModelCtrl', function () {

  // load the controller's module
  beforeEach(module('blinkUrbanApp'));

  var ModelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModelCtrl = $controller('ModelCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
