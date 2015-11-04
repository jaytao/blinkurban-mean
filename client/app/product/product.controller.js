'use strict';

angular.module('blinkUrbanApp')
  .controller('ProductCtrl', function ($scope, $stateParams, $http) {

    $scope.product = {};
    $scope.availableSizes = [];
    $scope.availableQuantity = [];
    $scope.orderSize = "";
    $scope.orderColor = "";
    $scope.orderQuantity = "1"; //by default, 1 item quantity is selected
    $scope.selectedColorIndex = 0; //by default, the first color is selected
    $scope.selectedSizeIndex = -1;

    $scope.slides = [];
    $scope.slides.push({ image: ""});

    //get the product that matches the provided id
    $http.get('/api/items/' + $stateParams.id).success(function(product) {
      $scope.product = product;
      //filter unique size to available sizes 
      $scope.availableSizes = _.pluck(_.uniq($scope.product.metrics, 'size'), 'size');
      $scope.allSizes = $scope.availableSizes;
      //filter unique colorname to available colors
      $scope.availableColors = _.uniq($scope.product.metrics, 'colorname');
      //if a color has been provided, set it as the orderColor
      if($stateParams.color){
        //get the index of the selected color from the availableColors list
        $scope.selectedColorIndex = _.findIndex($scope.availableColors, function(metric){
          return metric.colorname === $stateParams.color;
        });
        if($scope.selectedColorIndex !== -1){
          $scope.orderColor = $stateParams.color;
        }else{
          $scope.selectedColorIndex = 0; //by default go to the first color if the param color doesn't exist
          $scope.orderColor = $scope.availableColors[0].colorname;
        }
      }else{
        //default select the first color if no color is provided
        $scope.orderColor = $scope.availableColors[0].colorname;
      }

      $scope.updateAvailableQuantity($scope.orderColor);

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
      //update quantity
      if(value){
        $scope.updateAvailableQuantity(value, $scope.orderSize);
      }
    });

    //update availableQuantity everytime a size is selected
    $scope.$watch('orderSize', function(value){
      if(value){
        $scope.updateAvailableQuantity($scope.orderColor, value);
      }
    });

    $scope.$watch('availableQuantity', function(value){
      //if there are less available product then orderQuantity, reset to 1
      if(value.length < parseInt($scope.orderQuantity)){
        $scope.orderQuantity = "1";
      }
    });

    //get quantity of a product as an array of numbers
    $scope.updateAvailableQuantity = function(color, size){
      var quantity = 1;
      if(size && size !== ""){
        quantity = _.result(_.find($scope.product.metrics, function(metric){
          return metric.colorname === color && metric.size === size;
        }), 'count');
      }else{
        quantity = _.result(_.find($scope.product.metrics, function(metric){
          return metric.colorname === color;
        }), 'count');
      }
      
      quantity = quantity > 10 ? 10 : quantity; //limit select quantity to 10
      $scope.availableQuantity = _.range(1, quantity + 1); 
    };
    //check if there's an available size for this product
    $scope.hasSize = function(size){
    	return $scope.availableSizes.indexOf(size) >= 0 ? false : true;
    };
    //store selected color index to property highlight selected color
    $scope.selectColor = function(index){
    	$scope.selectedColorIndex = index;
    };
    //store selected size index to property highlight selected size
    $scope.selectSize = function(index){
    	$scope.selectedSizeIndex = index;
    };

  });
