

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.items', {
        url: '/items',
        templateUrl: 'app/admin/item/item.html',
        controller: 'ItemCtrl',
        admin: true
      });
  });
