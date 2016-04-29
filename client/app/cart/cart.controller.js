'use strict';

angular.module('blinkUrbanApp')
  .controller('CartCtrl', function ($scope, $http, Auth) {
    
    $scope.cartItems = [];
    var userId = Auth.getCurrentUser()._id;
    $http.get("/api/cart").then(function(result){
    	$scope.cartItems.push(result);
    });

    $http.post("").then(function(){

    });
    

  });
