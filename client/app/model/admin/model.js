'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('adminModel', {
        url: '/models',
        templateUrl: 'app/model/admin/model.html',
        controller: 'ModelAdminCtrl',
        admin: true
      });
  });
