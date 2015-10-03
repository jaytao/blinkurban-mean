'use strict';

angular.module('blinkUrbanApp')
  .controller('ItemCtrl', function ($scope, $http, socket) {

  	$scope.products = [];
  	$scope.item = {};
  	$scope.categories = ["Top", "Bottom", "Accessories"];

  	$http.get('/api/items').success(function(products) {
      $scope.products = products;
      socket.syncUpdates('item', $scope.products);
    });
  	
    $scope.addItem = function(){
   	  if($scope.item === '') {
      	return;
      }

      $http.post('/api/items', $scope.item);
      $scope.item = {};
      $scope.form.$setUntouched()
      //force refresh
      location.reload();
    };

    $scope.deleteItem = function(item) {
      $http.delete('/api/items/' + item._id);
      //force refresh
      location.reload();
    };
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('Item');
    });

  });
