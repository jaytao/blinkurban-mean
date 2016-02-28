'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('apparel', {
        url: '/apparel',
        templateUrl: 'app/apparel/apparel.html',
        controller: 'ApparelCtrl'
      })
      .state('apparelcategory', {
        url: '/apparel/:category',
        templateUrl: 'app/apparel/apparel.category.html',
        controller: 'ApparelCategoryCtrl'
      });
  });