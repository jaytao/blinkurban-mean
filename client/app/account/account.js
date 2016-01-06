'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: function($scope, $location){
          $scope.isActive = function(route) {
            return route === $location.path();
          };
        },
        authenticate: true
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'app/account/settings/profile.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'app/account/settings/password.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });