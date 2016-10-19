'use strict';

angular.module('blinkUrbanApp')
  .controller('VerifyTokenCtrl', function ($scope, $stateParams, $http) {

    $scope.token = $stateParams.token;
    $scope.verified = false;
    $http.post('/api/verify/token', {token: $scope.token}).then(function success(response){
        $scope.verified = true;
    }, function error(response){
        $scope.verified = false;  
    });
  })
  .controller('VerifyCtrl', function ($scope, $http, $location, Auth){
    if (!Auth.getCurrentUser().emailVerified) {
        $http.get('/api/verify/send').then(function success(response){
        }, function error(response){
        });
    }
    $location.path("/verify/confirmation") 
  })
  .controller('VerifyConfirmationCtrl', function ($scope, $http, Auth){
    if (Auth.getCurrentUser().emailVerified) {
        $scope.message = "User email already verified."
    }
    else {
        $scope.message = "A email has been sent to confirm your email address."     
    } 
  })
