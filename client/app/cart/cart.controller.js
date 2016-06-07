'use strict';

angular.module('blinkUrbanApp')
  .controller('CartCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';
    $scope.items = [];
    $http.get('/api/cart').success(function(cart){
        if (cart) {
            $scope.items = cart.items;
            $scope.cartTotal = $scope.items.reduce(function(memo, item) {
                return memo + (item.count*item.itemId.price);
            }, 0);
        } else {
            $scope.items = []
            $scope.cartTotal = 0
        }
    });
    
    $scope.cartDeleteAll = function(){
        $http.delete("/api/cart").then(function success(response){
            $scope.items = [];
            $scope.cartTotal = 0;
            socket.syncUpdates('item', $scope.items);
        }, function error(response){
        });
    };

    $scope.addToCart = function() {
    };

  });
