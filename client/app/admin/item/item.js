'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('item', {
        url: '/item',
        templateUrl: 'app/admin/item/item.html',
        controller: 'ItemCtrl'
      });
  });