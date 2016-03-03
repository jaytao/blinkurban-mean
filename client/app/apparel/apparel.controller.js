'use strict';

angular.module('blinkUrbanApp')
  .controller('ApparelCtrl', function ($scope, $http, socket) {
    $scope.categories = [];
    $http.get('/api/categories').success(function(categories) {
      $scope.categories = $scope.categories.concat(categories);
      socket.syncUpdates('category', $scope.categories);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('Category');
    });
  });

angular.module('blinkUrbanApp')
  .controller('ApparelCategoryCtrl', function ($scope, $http, socket, $stateParams) {
    //TODO implement socket for items
    $scope.results = [];
    $scope.category = $stateParams.category;
    $scope.filters = {
      colors: [],
      sizes: []
    };

    $http.get('/api/items/get?category=' + $scope.category).success(function(data) {
      $scope.results = data;

      //get all unique colors and sizes available and add it to the filter list
      var tempColor = [];
      data.forEach(function(item){
        tempColor = _.merge(tempColor, _.pluck(item.metrics, 'colorId'));
        item.metrics.forEach(function(metric){
          $scope.filters.sizes.push({size: metric.size});
        });
      });
      tempColor.forEach(function(item){
        $http.get('/api/colors/'+item).success(function(obj){
          $scope.filters.colors.push(obj);
        });
      });
      $scope.filters.sizes = _.uniq($scope.filters.sizes, 'size');

    });

    //TODO this is duplicate from search controller
    $scope.getUnique = function(metrics){
      return _.uniq(metrics, function(metric){
        return metric.colorId;
      });
    };

    $scope.show = function(color, size){
      
      var colorSelected = false;
      var colorMatch = false;
      $scope.filters.colors.forEach(function(filter){
        if(filter.selected){
          colorSelected = true;
          if(filter._id === color){
            colorMatch = true;
          }
        }
      });

      var sizeSelected = false;
      var sizeMatch = false;
      $scope.filters.sizes.forEach(function(filter){
        if(filter.selected){
          sizeSelected = true;
          if(filter.size === size){
            sizeMatch = true;
          }
        }
      });

      if(colorSelected && sizeSelected){
        return colorMatch && sizeMatch;
      }else if(colorSelected){
        return colorMatch;
      }else if(sizeSelected){
        return sizeMatch;
      }

      return true;
    };

  });
