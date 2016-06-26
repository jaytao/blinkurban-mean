'use strict';
angular.module('blinkUrbanApp')
  .controller('ModelCtrl', function ($scope, $http, $stateParams) {
    $scope.modelName = $stateParams.name;
    $http.get('/api/models/' + $scope.modelName).then(function success(model){
        $scope.model = model.data;
    }, function error(response){

    });
  });
