'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orderAdmin', {
        url: '/allorders',
        templateUrl: 'app/order/admin/admin.html',
        controller: 'OrderAdminCtrl',
        admin: true
      });
  });
