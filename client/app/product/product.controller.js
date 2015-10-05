'use strict';

angular.module('blinkUrbanApp')
  .controller('ProductCtrl', function ($scope, $stateParams, $http) {

    $scope.product = {};
    $scope.availableSizes = [];
    $scope.availableColors = [];
    $scope.orderSize = "";
    $scope.orderColor = "";

    $http.get('/api/items/' + $stateParams.id).success(function(product) {
      $scope.product = product;
      angular.forEach($scope.product.metrics, function(item){
      	if($scope.availableSizes.indexOf(item.size) === -1){
      		$scope.availableSizes.push(item.size)
      	}
      	if($scope.availableColors.indexOf(item.color) === -1){
      		$scope.availableColors.push({"color": item.color, "available": true})
      	}
      });
    });

    $scope.filterAvailableColors = function(){
    	angular.forEach($scope.product.metrics, function(item){
	      	if($scope.availableColors.indexOf(item.color) === -1 && item.size === $scope.orderSize.size){
	      		$scope.availableColors.push(item.color)
	      	}
	    });
    }

  });
