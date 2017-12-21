var settingsApp = angular.module("settingsApp", []);
settingsApp.controller("settingsCtrl", ['$scope','$window',
  function($scope,$window) {

    var storage = window.localStorage;
  $scope.pokeNumber = storage.getItem("pokeNumber");

  $scope.setPokeNumber = function (number){
    var storage = window.localStorage;
    storage.setItem("pokeNumber", number);
    console.log(storage.getItem("pokeNumber"));
    $scope.pokeNumber = number;
  };
  $scope.init = function(){
    var storage = window.localStorage;
    var numPreference = storage.getItem("pokeNumber");
    console.log(numPreference);
    var buttonSelected = '#pokeNumberOption' + numPreference;
    $(buttonSelected).addClass('active');
  }
  $window.onload = $scope.init();
}]);

$(document).ready(function(){

});
