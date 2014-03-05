var app = angular.module('app', ['LocalStorageModule']).run(function($rootScope, $location) {

});

app.controller('HomeController', function($scope, $timeout, localStorageService) {
    $scope.data;

    $scope.init = function(){

        $.getJSON('json.php', function(data) {
            $scope.data = data;
            $scope.team = localStorageService.get('team')||data.team[0];

            $scope.$apply();
        });
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
	
