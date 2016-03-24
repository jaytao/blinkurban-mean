'use strict';

angular.module('blinkUrbanApp')
  .controller('FaqCtrl', function($scope) {
	$scope.faqs = [{
	  'question': 'Where is the company located?',
	  'answer': 'We are located on the east coast of the United States.'
	},{
	  'question': 'Which countries do you serve?',
	  'answer': 'We primarily serve customers in the United States. We do have future plans for extending our services internationally.'
	},{
	  'question': 'How often do new products get released?',
	  'answer': 'We like to call them drops. Drops occur whenever we brewing selection is perfect. There is also more pressure for drops when site inventory are low.'
	},{
	  'question': 'Are the clothes made domestic in the US?',
	  'answer': "As of now, we haven't found the right people to collaborate with yet. Interestingly enough, our products are made all over the world."
	},{
	  'question': 'Where is your warehouse located?',
	  'answer': 'Our inventory is kept on the East Coast. This allows us to strategically deliver at the fastest rate.'
	}];
  });