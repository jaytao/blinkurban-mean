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
      $scope.list = [];
      $scope.text = '';
      $scope.submit = function() {
        if ($scope.text) {
          $scope.list.push(this.text);
          $scope.text = '';
        }
      };
    }]);

// angular.module('blinkUrbanApp')
//     .controller('NavbarSearchCtrl', ['$scope', function($scope) {
//     $scope.searchinput = '';
//     $scope.submit = function () {
//       if($scope.searchinput) {
//         $state.href('/api/items/search?field=' + $scope.searchinput);
//       }
//     }  
//     }]);



  