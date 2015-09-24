'use strict';

angular.module('blinkUrbanApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'NEW',
      'link': '/'
    },{
      'title': 'TOPS',
      'link': '/'
    },{
      'title': 'BOTTOMS',
      'link': '/'
    },{
      'title': 'ACCESSORIES',
      'link': '/'
    },{
      'title': 'SALE',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

  