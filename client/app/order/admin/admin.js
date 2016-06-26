'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('adminOrder', {
        url: '/allorders',
        templateUrl: 'app/order/admin/admin.html',
        controller: 'OrderAdminCtrl',
        admin: true
      });
  });
