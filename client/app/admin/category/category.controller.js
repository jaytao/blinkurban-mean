'use strict';

angular.module('blinkUrbanApp')
  .controller('CategoryCtrl', function ($scope, $http, socket) {

  	$scope.categories = [];
  	$scope.category = {};
  	$scope.category.types = [];

  	$http.get('/api/categories').success(function(categories) {
      $scope.categories = $scope.categories.concat(categories);
      socket.syncUpdates('category', $scope.categories);
    });

  	$scope.addCategoryType = function(){
  		if($scope.category.type){
  			$scope.category.types.push($scope.category.type);
  			$scope.category.type = "";
  		}
  	};

    $scope.updateCategory = function(category){
      $http.put('/api/categories/'+category._id, {name: category.name, types: category.types});
    };

    $scope.deleteCategory = function(category){
      $http.delete('/api/categories/'+category._id);
    };

  	$scope.addCategory = function() {
  		$http.post('/api/categories', {name: $scope.category.name, types: $scope.category.types})
  		.then(function success(response){
        //reset form fields and validation
        $scope.category = {};
        $scope.category.types = [];
        $scope.form.$setUntouched();
        $scope.form.$setPristine();
      })
  		.catch( function(err) {
        //TODO do something with the error
      });
  	};

    $scope.removeType = function(type, category){
      category.types.splice(category.types.indexOf(type),1);
      $scope.updateCategory(category);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('Category');
    });
  });
