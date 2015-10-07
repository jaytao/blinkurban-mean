'use strict';

angular.module('blinkUrbanApp')
  .controller('ItemCtrl', function ($scope, $http, socket, $modal) {

  	$scope.products = [];
  	$http.get('/api/items').success(function(products) {
      $scope.products = products;
      socket.syncUpdates('item', $scope.products);
    });

    $scope.createItemModal = function(){
    	$modal.open({
    		templateUrl: "app/admin/item/item.create.html",
    		size: "lg",
    		controller: function($scope, $modalInstance){
    			$scope.item = {};
			  	$scope.item.metrics = [];
			  	$scope.metric = {};
    			$scope.categories = ["Top", "Bottom", "Accessories"];
			  	$scope.colors = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Violet", 
			  	"Purple", "Magenta", "Pink", "Brown", "White", "Gray", "Black"];
			  	$scope.sizes = ["XXS","XS","S","M","L","XL", "XXL"];

			  	$scope.addMetric = function(){
			    	if($scope.metric !== "" && typeof $scope.metric.colorname !== 'undefined' && typeof $scope.metric.colorhex !== 'undefined'
			    		&& typeof $scope.metric.size !== 'undefined' && typeof $scope.metric.count !== 'undefined'){
			    		$scope.item.metrics.push($scope.metric);
			    		$scope.metric = {};
			    	}
			    };
			    $scope.removeMetric = function(metric){
			    	var index = $scope.item.metrics.indexOf(metric);
			    	$scope.item.metrics.splice(index,1);
			    };
			    $scope.addItem = function(){
			      $http.post('/api/items', $scope.item);
			      $scope.item = {};
			      //force refresh
			      location.reload();
			    };
			    $scope.cancel = function(){
			    	$modalInstance.dismiss('cancel');
			    };

    		}
    	});
    }
  	

    $scope.deleteItem = function(item) {
      $http.delete('/api/items/' + item._id);
      //force refresh
      location.reload();
    };
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('Item');
    });

  });
