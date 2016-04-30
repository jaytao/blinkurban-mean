'use strict';

angular.module('blinkUrbanApp')
  .controller('CartCtrl', function ($scope,$http) {
    $scope.message = 'Hello';
    $scope.items = [];
    $http.get('/api/cart/56ec918c72723c2b4c183e71').success(function(cart){
        $scope.items = cart.items;
    });

  });
