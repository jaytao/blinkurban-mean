'use strict';

angular.module('blinkUrbanApp')
  .directive('productSnapshot', function () {
    return {
      templateUrl: 'components/productSnapshot/productSnapshot.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });