'use strict';

describe('Directive: productSnapshot', function () {

  // load the directive's module and view
  beforeEach(module('blinkUrbanApp'));
  beforeEach(module('components/productSnapshot/productSnapshot.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<product-snapshot></product-snapshot>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the productSnapshot directive');
  }));
});