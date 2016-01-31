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
