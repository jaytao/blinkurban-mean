'use strict';
angular.module('blinkUrbanApp')
  .controller('OrderAdminCtrl', function ($scope, $http, Auth) {
    $scope.setYear = function(i){
        $scope.yearIndex = i;
    }
    $scope.setMonth = function(i){
        $scope.monthIndex = i;
    }
    $scope.getOrders = function(){
        var y = $scope.years[$scope.yearIndex];
        var m = $scope.months[$scope.monthIndex];
        $http.get('/api/orders/all', {headers: {year: y, month: m}}).success(function(orders){
            if (orders) {
                $scope.orders = orders; 
            } else {
                $scope.orders = [];
            }
        });
    }
    
    //Setup the lists that populate the dropdown menu
    var dateObj = new Date();
    $scope.years = [];
    for (var x = 2015; x <= dateObj.getUTCFullYear(); x++){
        $scope.years.push(x);
    }
    $scope.yearIndex = dateObj.getUTCFullYear()-2015;

    $scope.months= ["1","2","3","4","5","6","7","8","9","10","11","12"];
    $scope.monthIndex = dateObj.getUTCMonth();

    $scope.updateShipped = function(index, tracking){
        var orderId = $scope.orders[index]._id;
        $http.post('/api/orders/updateShipped', {orderId: orderId, trackingNumber: tracking}).then(function success(response){
            $scope.orders[index].status = "Shipped";
            $scope.orders[index].trackingNumber = tracking;
        }, function error(response) {
        
        });
    }

  });
