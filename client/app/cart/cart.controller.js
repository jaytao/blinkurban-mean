'use strict';

angular.module('blinkUrbanApp')
  .controller('CartCtrl', function ($scope,$http) {
    $scope.message = 'Hello';
    $scope.items = [];
    $http.get('/api/cart').success(function(cart){
        $scope.items = cart.items;
        $scope.cartTotal = $scope.items.reduce(function(memo, item) {
            return memo + (item.count*item.itemId.price); // return previous total plus current age
        }, 0);
    });
    
    $scope.addToCart = function() {
    };

  });
