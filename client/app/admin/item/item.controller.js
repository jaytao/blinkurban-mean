'use strict';

angular.module('blinkUrbanApp')
  .controller('ItemCtrl', function ($scope, $http, socket, $modal) {

    //TODO: make socket io work 

  	$scope.products = [];
  	$http.get('/api/items').success(function(products) {
      $scope.products = products;
      socket.syncUpdates('item', $scope.products);
    });

    // two differnt mode fo this modal 'Create', 'Update'
    $scope.openItemModal = function(mode, item){
    	$modal.open({
    		templateUrl: "app/admin/item/item.create.html",
    		size: "lg",
    		controller: function($scope, $modalInstance){

          $scope.mode = mode;
    			$scope.item = {};
			  	$scope.item.metrics = [];
          $scope.item.styles = [];
			  	$scope.metric = {};
    			$scope.categories = ["top", "bottom", "accessories"];
			  	$scope.colors = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Violet", 
			  	"Purple", "Magenta", "Pink", "Brown", "White", "Gray", "Black"];
			  	$scope.sizes = ["XXS","XS","S","M","L","XL", "XXL"];
          $scope.style = "";

          if(mode === 'Update'){
            $scope.item = item;
          }

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

			    $scope.submit = function(){
            if($scope.mode === 'Create'){
              $http.post('/api/items', $scope.item);
            }else if($scope.mode === 'Update'){
              $http.put('/api/items/' + $scope.item._id, $scope.item);
            }
			      
			      //force refresh
			      location.reload();
			    };

			    $scope.cancel = function(){
			    	$modalInstance.dismiss('cancel');
			    };

          $scope.addStyle = function(){
            if($scope.style !== "" && $scope.item.styles.indexOf($scope.style) === -1){
              $scope.item.styles.push($scope.style);
              $scope.style = "";
            }
          };

          $scope.removeStyle = function(style){
            var index = $scope.item.styles.indexOf(style);
            $scope.item.styles.splice(index,1);
          }

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
