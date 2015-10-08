'use strict';

angular.module('blinkUrbanApp')
  .controller('ProductCtrl', function ($scope, $stateParams, $http) {

    $scope.product = {};
    $scope.availableSizes = [];
    $scope.availableColors = [];
    $scope.orderSize = "";
    $scope.orderColor = "";
    $scope.selectedColorIndex = -1;
    $scope.selectedSizeIndex = -1;

    $scope.slides = [];

    $http.get('/api/items/' + $stateParams.id).success(function(product) {
      $scope.product = product;
      angular.forEach($scope.product.metrics, function(item){
      	if($scope.availableSizes.indexOf(item.size) === -1){
      		$scope.availableSizes.push(item.size);
      	}
      	if($scope.availableColors.indexOf(item.color) === -1){
      		$scope.availableColors.push(item.color);
      	}
      });
    });

    //filter availableSizes everytime there's a change to ordeColor
    $scope.$watch('orderColor', function(value){
    	$scope.availableSizes = [];
    	angular.forEach($scope.product.metrics, function(item){
	      	if(item.colorname === value){
	      		$scope.availableSizes.push(item.size);
	      	}
	    });
	    //reset order size if it isn't available for the new selected color
      if($scope.hasSize($scope.orderSize)){
        $scope.orderSize = "";
        $scope.selectedSizeIndex = -1;
      }
	    
    });

    $scope.hasSize = function(size){
    	return $scope.availableSizes.indexOf(size) >= 0 ? false : true;
    }
    //store selected color index to property highlight selected color
    $scope.selectColor = function(index){
    	$scope.selectedColorIndex = index;
    }
    //store selected size index to property highlight selected size
    $scope.selectSize = function(index){
    	$scope.selectedSizeIndex = index;
    }

  });
