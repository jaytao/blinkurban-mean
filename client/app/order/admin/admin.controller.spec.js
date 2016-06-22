'use strict';

describe('Controller: OrderAdminCtrl', function () {

  // load the controller's module
  beforeEach(module('blinkUrbanApp'));

  var OrderCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderAdminCtrl = $controller('OrderAdminCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
