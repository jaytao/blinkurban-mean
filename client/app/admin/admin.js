'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html'
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'app/admin/admin.users.html',
        controller: 'AdminCtrl'
      });
  });