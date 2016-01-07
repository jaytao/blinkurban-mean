'use strict';

angular.module('blinkUrbanApp')
  .controller('ItemCtrl', function ($scope, $http, socket, $modal) {

  	$scope.products = []; //list of all products
    $scope.colors = []; //list of all available colors
    $scope.categories = []; //list of all available categories

    $http.get('/api/colors').success(function(colors) {
      $scope.colors = colors;
      socket.syncUpdates('color', $scope.colors);
    });

  	$http.get('/api/items').success(function(products) {
      $scope.products = products;
      socket.syncUpdates('item', $scope.products);
    });

    $scope.openNewColorModal = function(colors){
      $modal.open({
        templateUrl: "app/admin/item/item.createcolor.html",
        controller: function($scope, $modalInstance){
          $scope.selectedColor = "";
          $scope.colors = colors;
          $scope.newColor = {}; //model for creating a new color
          //add a color to the available colors 
          $scope.addColor = function(){
            if($scope.newColor){
              $http.post('/api/colors', $scope.newColor)
              .then(function success(response){
                //reset form fields and validation
                $scope.newColor = {};
                $scope.form.$setUntouched();
                $scope.form.$setPristine();
              })
              .catch( function(err) {
                //TODO do something with the error
              });
            }
          };
          //dismiss modal
          $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
          };
        }

      });
    };

    // two differnt mode fo this modal 'Create', 'Update'
    $scope.openItemModal = function(colors, mode, item){
    	$modal.open({
    		templateUrl: "app/admin/item/item.create.html",
    		size: "lg",
    		controller: function($scope, $modalInstance){

          $scope.mode = mode;
    			$scope.item = {};
          $scope.item.categories = [];
			  	$scope.item.metrics = [];
          $scope.item.materials = [];
			  	$scope.metric = {};
			  	$scope.sizes = ["XXS","XS","S","M","L","XL", "XXL"];
          $scope.material = "";
          $scope.colors = colors;

          if(mode === 'Update'){
            $scope.item = item;
          }

          $http.get('/api/categories').success(function(categories) {
            $scope.categories = categories;
            socket.syncUpdates('category', $scope.categories);
          });

          //add selected category to item category list
          $scope.addCategory = function(){
            if($scope.selectedType){
              //check if the selected category has already been added
              var category = _.find($scope.item.categories, {'name': $scope.selectedCategory.name});
              if(category){
                //add selected type from existing category if it doesn't exist
                if(category.types.indexOf($scope.selectedType) === -1){
                  category.types.push($scope.selectedType);
                  //reset models for category form selection
                  $scope.selectedType = "";
                  $scope.selectedCategory = "";
                }
              }else{
                //create new category to be added
                $scope.item.categories.push({
                  name: $scope.selectedCategory.name,
                  types: [$scope.selectedType]
                });
                //reset models for category form selection
                $scope.selectedType = "";
                $scope.selectedCategory = "";
              }
              
            }
          }
          
			  	$scope.addMetric = function(){
			    	if($scope.metric && $scope.metric.colorId && $scope.metric.size && $scope.metric.count ){
			    		$scope.item.metrics.push($scope.metric);
			    		$scope.metric = {};
			    	}
			    };
			    $scope.removeMetric = function(metric){
			    	var index = $scope.item.metrics.indexOf(metric);
			    	$scope.item.metrics.splice(index,1);
			    };

			    $scope.submit = function(){
            if($scope.mode === 'Create'){
              $http.post('/api/items', $scope.item).then(function success(response){

              }, function error(response){

              });
            }else if($scope.mode === 'Update'){
              //_.map($scope.item.metrics, _.partialRight(_.pick, "colorId", "count", "size"));
              $http.put('/api/items/' + $scope.item._id, $scope.item);
            }
            $scope.cancel();
			    };

			    $scope.cancel = function(){
			    	$modalInstance.dismiss('cancel');
			    };

          $scope.addMaterial = function(){
            if($scope.material && $scope.item.materials.indexOf($scope.material) === -1){
              $scope.item.materials.push($scope.material);
              $scope.material = "";
            }
          };

          $scope.removeMaterial = function(material){
            var index = $scope.item.materials.indexOf(material);
            $scope.item.materials.splice(index,1);
          };

          $scope.getColorById = function(colorId){
            return _.find($scope.colors, function(color){
              return color._id === colorId;
            });
          };

    		}
    	});
    }
  	
    $scope.deleteItem = function(item) {
      $http.delete('/api/items/' + item._id);
    };
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('Item');
      socket.unsyncUpdates('Color');
      socket.unsyncUpdates('Category');
    });

  });
