
professorApp.controller("rulesCtrl", ['$scope','$window',
  function($scope,$window) {

    var storage = window.localStorage;
  
  $scope.openRules = function openRules(ruleset) {
	  window.open(new Map(JSON.parse(storage.getItem("rules"))).get(ruleset), '_blank');
  }

}]);