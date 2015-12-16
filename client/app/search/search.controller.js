'use strict';

angular.module('blinkUrbanApp')
  .controller('SearchCtrl', function ($scope, $stateParams, $http) {

    $scope.query = $stateParams.query;
    $scope.results = [];

    $http.get('/api/items/search?field=' + $scope.query).then(
    function successCallback(response){
		$scope.results = response.data;
	},function errorCallback(response) {
      //redirect to home page if it is an invalid search
      $location.path("/");
    });

  });
