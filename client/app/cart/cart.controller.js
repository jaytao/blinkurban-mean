'use strict';

angular.module('blinkUrbanApp')
  .controller('CartCtrl', function ($scope, $http, Auth, $modal, $window) {
    $scope.message = 'Hello';
    $scope.items = [];
    $scope.email = Auth.getCurrentUser().email;

    var s = document.createElement('script');
    s.src = 'https://checkout.stripe.com/checkout.js';
    document.body.appendChild(s);

    $http.get('/api/cart').success(function(cart){
        if (cart) {
            $scope.items = cart.items;
            $scope.cartTotal = $scope.getCartTotal($scope.items)
        } else {
            $scope.items = []
            $scope.cartTotal = 0
        }
    });
    
    $scope.cartDeleteAll = function(){
        $http.delete("/api/cart").then(function success(response){
            $scope.items = [];
            $scope.cartTotal = 0;
            $route.reload();
        }, function error(response){
        });
    };
    
    $scope.cartDeleteOne = function(index){
        $scope.items.splice(index,1);
        $scope.cartTotal = $scope.getCartTotal($scope.items);
        $http.post("/api/cart", {items:$scope.items}).then(function success(response){
        }, function error(response){
        });
    };


    $scope.getCartTotal = function(cartItems){
        return cartItems.reduce(function(memo, item) {
            return memo + (item.count*item.itemId.price);
        }, 0);

    };

    $scope.placeOrder = function(){
        var handler = StripeCheckout.configure({
            key: 'pk_test_oXEphxVQskWDdYjY58oGhXbX',
            image: 'assets/images/brand.png',
            locale: 'auto',
            name: "Blink Urban",
            description: "Checkout",
            shippingAddress: true,
            zipCode: true,
            email: $scope.email,
            token: function(token,args) {
                $http.post("/api/orders", {
                    token: token,
                    args: args
                }).then(function success(response){
                    $modal.open({
                        templateUrl: "app/cart/success.html",
                        controller: function($scope, $modalInstance){
                            $scope.orderId = response.data.id
                            $scope.leave = function(){
                                $modalInstance.dismiss('cancel');
                                $window.location.href = '/index.html'; 
                            };
                        }
                    });
                }, function error(response){

                });
            }
        });
        handler.open({
            amount: $scope.cartTotal * 100,
        });
    }
    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
        $window.location.href = '/index.html';
    }
  });
