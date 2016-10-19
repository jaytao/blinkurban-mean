'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('verifyToken', {
        url: '/verifytoken?token',
        templateUrl: 'app/verify/verifyToken.html',
        controller: 'VerifyTokenCtrl'
      })
      .state('verify', {
        url: '/verify',
        templateUrl: 'app/verify/verify.html',
        controller: 'VerifyCtrl',
        authenticate: true
      })
      .state('verifyConfirmation', {
        url: '/verify/confirmation',
        templateUrl: 'app/verify/verifyConfirmation.html',
        controller: 'VerifyConfirmationCtrl',
        authenticate: true
      });
  });
