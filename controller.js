var app = angular.module('app', ['LocalStorageModule']).run(function($rootScope, $location) {

});

app.controller('HomeController', function($scope, $timeout, localStorageService) {
    $scope.data;

    $scope.init = function(){
	
	try {
	var q= "select%20*%20from%20html%20where%20url%3D%22ado.kevinverhoef.nl%2Fjson.php%22%20and%20xpath%3D%27%2Fhtml%27";
	$.getJSON("http://query.yahooapis.com/v1/public/yql?format=json&diagnostics=true&q=" + q,
		
		function(data) {
			alert(data)
			$scope.data = JSON.parse(decodeURI(JSON.stringify(data.query)));
			$scope.team = localStorageService.get('team')||data.team[0];
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
            localStorageService.add('team',JSON.stringify($scope.team));
        }
    }, false);

});

app.filter('reverse', function() {
  return function(items) {
    if (items==undefined){return}
    return items.slice().reverse();
  };
});
	
