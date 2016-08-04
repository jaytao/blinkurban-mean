'use strict';

angular.module('blinkUrbanApp')
  .controller('FooterCtrl', function ($scope) {
    $scope.company = [{
      'title': 'ABOUT US',
      'link': 'resources/resource#about'
    },{
      'title': 'OUR COMMITMENT',
      'link': 'resources/resource#commitment'
    },{
      'title': 'RESOURCES',
      'link': 'resources/resource#resource'
    }];


    $scope.help = [{
      'title': 'CONTACT US',
      'link': 'resources/resource#support'
    },{
      'title': 'FAQs',
      'link': 'resources/resource#faq'
    },{
      'title': 'SHIPPING INFO',
      'link': 'resources/resource#shipping'  
    }];

  });
