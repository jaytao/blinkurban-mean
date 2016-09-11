'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('verifyToken', {
        url: '/verifytoken?token',
        templateUrl: 'app/verify/verifytoken.html',
        controller: 'VerifyTokenCtrl'
      })
      .state('verify', {
        url: '/verify',
        templateUrl: 'app/verify/verify.html',
        controller: 'VerifyCtrl',
        authenticate: true
      });
  });
