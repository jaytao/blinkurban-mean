'use strict';

angular.module('blinkUrbanApp')
  .controller('CartCtrl', function ($scope,$http) {
    $scope.message = 'Hello';
    $scope.items = [];
    $http.get('/api/cart').success(function(cart){
        $scope.items = cart.items;
    });
    
    $scope.addToCart = function() {


    };
  });
