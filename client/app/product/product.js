'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product/:id?color',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl'
      });
  });


