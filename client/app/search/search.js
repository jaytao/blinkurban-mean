'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search/:query',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });