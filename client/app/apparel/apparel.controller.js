'use strict';

angular.module('blinkUrbanApp')
  .controller('ApparelCtrl', function ($scope, $http, socket) {
    $scope.categories = [];
    $http.get('/api/categories').success(function(categories) {
      $scope.categories = $scope.categories.concat(categories);
      socket.syncUpdates('category', $scope.categories);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('Category');
    });
  });

angular.module('blinkUrbanApp')
  .controller('ApparelCategoryCtrl', function ($scope, $http, socket, $stateParams) {
    //TODO implement socket for items
    $scope.results = [];
    $scope.category = $stateParams.category;
    $http.get('/api/items/get?category=' + $scope.category).success(function(data) {
      $scope.results = data;
    });

    //TODO this is duplicate from search controller
    $scope.getUnique = function(metrics){
      return _.uniq(metrics, function(metric){
        return metric.colorId;
      });
    };

  });
