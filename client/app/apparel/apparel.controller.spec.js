'use strict';

describe('Controller: ApparelCtrl', function () {

  // load the controller's module
  beforeEach(module('blinkUrbanApp'));

  var ApparelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApparelCtrl = $controller('ApparelCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
