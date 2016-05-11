'use strict';

angular.module('blinkUrbanApp')
  .controller('ProductCtrl', function ($scope, $stateParams, $http, $location) {

    $scope.product = {};
    $scope.availableSizes = [];
    $scope.availableQuantity = [];
    $scope.orderSize = "";
    $scope.orderColor = "";
    $scope.orderQuantity = "1"; //by default, 1 item quantity is selected
    $scope.selectedColorIndex = 0; //by default, the first color is selected
    $scope.selectedSizeIndex = -1;

    //get the product that matches the provided id
    $http.get('/api/items/' + $stateParams.id).then(function successCallback(response) {
      $scope.product = response.data;
      //filter unique size to available sizes 
      $scope.availableSizes = _.pluck(_.uniq($scope.product.metrics, 'size'), 'size');
      $scope.allSizes = $scope.availableSizes;
      //filter unique colorname to available colors
      $scope.availableColors = _.uniq($scope.product.metrics, function(metric){
        return metric.colorId._id;
      });
      //if a color has been provided, set it as the orderColor
      if($stateParams.color){
        //get the index of the selected color from the availableColors list
        $scope.selectedColorIndex = _.findIndex($scope.availableColors, function(metric){
          return metric.colorId._id === $stateParams.color;
        });
        if($scope.selectedColorIndex !== -1){
          $scope.orderColor = $stateParams.color;
        }else{
          $scope.selectedColorIndex = 0; //by default go to the first color if the param color doesn't exist
          $scope.orderColor = $scope.availableColors[0].colorId._id;
        }
      }else{
        //default select the first color if no color is provided
        $scope.orderColor = $scope.availableColors[0].colorId._id;
      }

      $scope.updateAvailableQuantity($scope.orderColor);
    }, function errorCallback(response) {
      //redirect to home page if it is an invalid id
      $location.path("/");
    });
    
    //filter availableSizes everytime there's a change to orderColor
    $scope.$watch('orderColor', function(value){
    	$scope.availableSizes = [];
    	angular.forEach($scope.product.metrics, function(item){
	      	if(item.colorId._id === value){
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
      if(size){
        quantity = _.result(_.find($scope.product.metrics, function(metric){
          return metric.colorId._id === color && metric.size === size;
        }), 'count');
      }else{
        quantity = _.result(_.find($scope.product.metrics, function(metric){
          return metric.colorId._id === color;
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
    //submit order to be added 
    $scope.submit = function(){
        var colorname = $scope.getDisplayColorName().colorId.colorname;
        var count = $scope.orderQuantity;
        var size = $scope.orderSize;
        
        $http.put("/api/cart", {colorname: colorname, count: count, size: size, itemId: $scope.product._id}).then(function success(response){
        });
    };

    $scope.getDisplayColorName = function(){
      return _.find($scope.availableColors, function(color){
        return color.colorId._id === $scope.orderColor;
      });
    };

    //tempColor is displayed only when users hover over a color. 
    $scope.tempColor = "";
    $scope.hoverColorIn = function(color){
      $scope.tempColor = color;
    };
    $scope.hoverColorOut = function(){
      $scope.tempColor = "";
    };

  });
