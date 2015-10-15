'use strict';

angular.module('blinkUrbanApp')
  .controller('FaqCtrl', function($scope) {
	$scope.faqs = [{
	  'question': 'Where is the company located?',
	  'answer': 'We are located in the east coast of the United States.'
	},{
	  'question': 'Which countries do you serve?',
	  'answer': 'We primarily serve customers in North America.'
	},{
	  'question': 'How often do new products get released',
	  'answer': 'Whenever we satisfactory with a design that we would like to sell'
	}];
  });