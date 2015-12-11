'use strict';

angular.module('blinkUrbanApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $location) {
    $scope.errors = {};

    $scope.user = Auth.getCurrentUser();

    $scope.changePassword = function(form) {
      //$scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          //reset form fields and validation
          $scope.user.oldPassword = "";
          $scope.user.newPassword = "";
          $scope.user.confirmpassword = "";
          form.$setUntouched();
          form.$setPristine();
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.updateProfile = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.updateProfile( { firstname: $scope.user.firstname, lastname: $scope.user.lastname, email: $scope.user.email} )
        .then( function() {
          $scope.message = 'Profile successfully updated.';
        })
        .catch( function(err) {
          $scope.message = '';
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });
