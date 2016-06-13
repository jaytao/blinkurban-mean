'use strict';

angular.module('blinkUrbanApp')
  .controller('CartCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';
    $scope.items = [];
    $http.get('/api/cart').success(function(cart){
        if (cart) {
            $scope.items = cart.items;
            $scope.cartTotal = $scope.getCartTotal($scope.items)
        } else {
            $scope.items = []
            $scope.cartTotal = 0
        }
    });
    
    $scope.cartDeleteAll = function(){
        $http.delete("/api/cart").then(function success(response){
            $scope.items = [];
            $scope.cartTotal = 0;
            $route.reload();
        }, function error(response){
        });
    };
    
    $scope.cartDeleteOne = function(index){
        $scope.items.splice(index,1);
        $scope.cartTotal = $scope.getCartTotal($scope.items);
        $http.post("/api/cart", {items:$scope.items}).then(function success(response){
        }, function error(response){
        });
    };
    $scope.getCartTotal = function(cartItems){
        return cartItems.reduce(function(memo, item) {
            return memo + (item.count*item.itemId.price);
        }, 0);

    };
  });
