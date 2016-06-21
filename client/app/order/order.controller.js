'use strict';

angular.module('blinkUrbanApp')
  .controller('OrderCtrl', function ($scope, $http, Auth) {
    $scope.pageIndex = new Date().getFullYear();

    $scope.getOrders = function(year){
      $http.get('/api/orders', {headers: {year: year}}).success(function(orders){
          if (orders) {
              $scope.orders = orders;
          } else {
          }
      });
    }

    $scope.getOrders($scope.pageIndex);
  });
