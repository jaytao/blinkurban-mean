'use strict';

angular.module('blinkUrbanApp')
<<<<<<< HEAD
  .controller('CartCtrl', function ($scope,$http) {
    $scope.message = 'Hello';
    $scope.items = [];
    $http.get('/api/cart/56ec918c72723c2b4c183e71').success(function(cart){
        $scope.items = cart.items;
    });
=======
  .controller('CartCtrl', function ($scope, $http, Auth) {
    
    $scope.cartItems = [];
    var userId = Auth.getCurrentUser()._id;
    $http.get("/api/cart").then(function(result){
    	$scope.cartItems.push(result);
    });

    $http.post("").then(function(){

    });
    

>>>>>>> a01bac64ebc82be2f6e47fe5b6cc65bcf68936be
  });
