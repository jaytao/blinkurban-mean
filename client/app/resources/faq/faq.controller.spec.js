'use strict';

describe('Controller: FaqCtrl', function () {

  // load the controller's module
  beforeEach(module('blinkUrbanApp'));

  var FaqCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductCtrl = $controller('FaqCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
