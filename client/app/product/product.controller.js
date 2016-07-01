'use strict';

angular.module('blinkUrbanApp')
  .controller('ProductCtrl', function ($scope, $stateParams, $http, $location, $modal) {

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

          //Create main product filter
      $scope.list=[{item:"http://www.patagonia.com/tsimages/55180_FGE.fpx?ftr=8&cvt=jpeg,scans=progressive", category:'1'},
                  {item:"http://www.511tactical.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/74290/055/74290_055_01.jpg", category:'2'},
                  {item: $scope.product.productImage, category:'3'},
                  {item:"test 4", category:'4'},
                  {item:"test 3", category:'5'},
                   {item:"test 4", category:'6'}                 
                  ]
      $scope.filter="3"
      $scope.isDisplayed=function(item, filter){
       if(filter!="")
       {
           if(item.category==filter)
               return true;
           return false;
       }
          return true;
      }
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
        var image;
        var message; 

        for (var i = 0; i < $scope.product.metrics.length; i++){
            var x = $scope.product.metrics[i];
            if (x.colorId.colorname == colorname && x.size == size){
                image = x.images[0];
            }
        }
        if (count && size) {
            $http.put("/api/cart", {colorname: colorname, count: count, size: size, itemId: $scope.product._id, image: image}).then(function success(response){
                $scope.openAddToCartModal("Successfully Added Item To Cart");
            }, function error(response){
                $scope.openAddToCartModal("Error!");
            });
        } else {
            $scope.openAddToCartModal("Please Select Color and Size");
        }
    };
    
    $scope.openAddToCartModal = function(message){
        $modal.open({
            templateUrl: "app/product/popup.html",
            controller: function($scope, $modalInstance){
                $scope.message = message
                $scope.cancel = function(){
                    $modalInstance.dismiss('cancel');
                };
            }
        });

    };

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
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

    $scope.pro1 = "";
    $scope.pro = function(productImage){
      $scope.pro1 = productImage;
    }

  });
