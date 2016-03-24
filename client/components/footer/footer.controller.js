'use strict';

angular.module('blinkUrbanApp')
  .controller('FooterCtrl', function ($scope) {
    $scope.company = [{
      'title': 'ABOUT US',
      'link': '/resources/about'
    },{
      'title': 'OUR COMMITMENT',
      'link': '/resources/commitment'
    },{
      'title': 'RESOURCES',
      'link': '/resources/resource'
    }];


    $scope.help = [{
      'title': 'CONTACT US',
      'link': '/resources/contact'
    },{
      'title': 'FAQs',
      'link': '/resources/faq'
    },{
      'title': 'SHIPPING INFO',
      'link': '/resources/shipping'  
    }];

  });
