'use strict';

angular.module('blinkUrbanApp')
  .directive('productSnapshot', function () {
    return {
      templateUrl: 'components/productSnapshot/productSnapshot.html',
      restrict: 'EA',
      scope: {
      	data: '='
      },
      link: function (scope, element, attrs) {
      	
      },
      controller: function($scope){

      }
    };
  });