var app = angular.module('app', ['LocalStorageModule']).run(function($rootScope, $location) {

});

app.controller('HomeController', function($scope, $timeout) {
    $scope.data;

    $scope.init = function(){
	
	try {
		var q= "select%20*%20from%20html%20where%20url%3D%22ado.kevinverhoef.nl%2Fjson.php%22%20and%20xpath%3D%27%2Fhtml%27";
		$.getJSON("http://query.yahooapis.com/v1/public/yql?format=json&diagnostics=true&q=" + q,
			
			function(data) {
				$scope.data = JSON.parse(data.query.results.html.body.p);
				//alert(JSON.stringify($scope.data.team));
				//console.log($scope.json);
				$scope.team = $scope.data.team[0];
				$scope.$apply();
			}
		);
	}
	catch (e){
		alert(e);
	}
    }

    $scope.$watch('team', function(newValue, oldValue, scope) {
        if (newValue != undefined){
            $scope.week = newValue.week[newValue.week.length-1];
            $scope.limit = 2;
        }
    }, false);

});

app.filter('reverse', function() {
  return function(items) {
    if (items==undefined){return}
    return items.slice().reverse();
  };
});
	
app.filter('rmwhitespace', function() {
  return function(obj) {
	return obj.replace(/ /g,'');
  };
});
