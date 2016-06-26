'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('model', {
        url: '/model/:name',
        templateUrl: 'app/model/model.html',
        controller: 'ModelCtrl'
      });
  });
