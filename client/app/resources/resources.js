'use strict';

angular.module('blinkUrbanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/resources/about',
        templateUrl: 'app/resources/about/about.html'
      })
      .state('commitment', {
        url: '/resources/commitment',
        templateUrl: 'app/resources/commitment/commitment.html'
      })
      .state('contact', {
        url: '/resources/contact',
        templateUrl: 'app/resources/contact/contact.html'
      })
      .state('faq', {
        url: '/resources/faq',
        templateUrl: 'app/resources/faq/faq.html'
      })
      .state('shipping', {
        url: '/resources/shipping',
        templateUrl: 'app/resources/shipping/shipping.html'
      });
  });