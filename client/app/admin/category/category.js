'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.category', {
        url: '/category',
        templateUrl: 'app/admin/category/category.html',
        controller: 'CategoryCtrl'
      });
  });