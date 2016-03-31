'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });


// Attempting to switch quotes
$(function() {
    $('#c1').on('click', function() {
        $('#welcome').show('fast');
    });
});
