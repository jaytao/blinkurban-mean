'use strict';

angular.module('blinkUrbanApp')
  .controller('OrderCtrl', function ($scope, $http, Auth) {
    $scope.pageIndex = new Date().getFullYear();

    $scope.getOrders = function(){
      var y = $scope.years[$scope.yearIndex];
      $http.get('/api/orders', {headers: {year: y}}).success(function(orders){
          if (orders) {
              $scope.orders = orders;
          } else {
          }
      });
    }
    
    $scope.setYear = function(index){
        $scope.yearIndex=index;
    }
    var dateObj = new Date();
    $scope.years = []
    $scope.yearIndex = dateObj.getUTCFullYear()-2015;
    for (var x = 2015; x <= dateObj.getUTCFullYear(); x++){
         $scope.years.push(x);
    } 
  });
