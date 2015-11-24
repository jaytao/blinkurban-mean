'use strict';

angular.module('blinkUrbanApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'NEW',
      'link': '/new'
    },{
      'title': 'TOPS',
      'link': '/tops'
    },{
      'title': 'BOTTOMS',
      'link': '/bottoms'
    },{
      'title': 'ACCESSORIES',
      'link': '/accessories'
    },{
      'title': 'SALE',
      'link': '/sale'
    }];
    // To hide the search icon and bring search bar
    $scope.clickedsearch=true;

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

angular.module('blinkUrbanApp')
    .controller('NavbarSearchCtrl', ['$scope', function($scope) {
      $scope.searchinput = [];
      $scope.text = '';
      $scope.submit = function() {
        if ($scope.text) {
          $scope.searchinput.push(this.text);
          $scope.text = '';
        }
      };
    }]);

  