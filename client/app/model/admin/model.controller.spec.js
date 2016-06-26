'use strict';

describe('Controller: ModelAdminCtrl', function () {

  // load the controller's module
  beforeEach(module('blinkUrbanApp'));

  var ModelAdminCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModelAdminCtrl = $controller('ModelAdminCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
