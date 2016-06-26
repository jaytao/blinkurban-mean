'use strict';

angular.module('blinkUrbanApp')
  .controller('ModelAdminCtrl', function ($scope, $http, $modal) {
    $scope.update = function(model){
        $http.post("/api/models", model).then(function success(response){
            $modal.open({
                templateUrl: "app/model/admin/message.html",
                controller: function($scope, $modalInstance){
                    $scope.message = "Model Added";
                    $scope.leave = function(){
                        $modalInstance.dismiss('cancel');
                    };
                }
            });

        }, function error(response){

        });
    }
    $scope.remove = function(name){
        $http.delete("/api/models/" + name).then(function success(response){
            $modal.open({
                templateUrl: "app/model/admin/message.html",
                controller: function($scope, $modalInstance){
                    $scope.message = "Model Deleted";
                    $scope.leave = function(){
                        $modalInstance.dismiss('cancel');
                    };
                }
            });

        }, function error(resonse){

        });
    }
    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    }
  });
