'use strict';

angular.module('blinkUrbanApp')
  .controller('SearchCtrl', function ($scope, $stateParams, $http) {

    $scope.query = $stateParams.query;
    $scope.results = [];
    $scope.resultCount = 0;

    //get a list of unique colors from the metrics
    $scope.getUnique = function(metrics){
      return _.uniq(metrics, function(metric){
        return metric.colorId;
      });
    };

    $http.get('/api/items/search?field=' + $scope.query).then(
    function successCallback(response){
		  $scope.results = response.data;
      //update result count by adding all of the metrics unique colors for each item
      _.forEach($scope.results, function(item){
        $scope.resultCount += _.uniq(item.metrics, function(metric){
          return metric.colorId;
        }).length;
      });


	  },function errorCallback(response) {
      //redirect to home page if it is an invalid search
      $location.path("/");
    });

  });
