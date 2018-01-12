var loaderApp = angular.module("loaderApp", []);
loaderApp.controller("loaderCntr", ['$scope','$window',
  function($scope,$window) {

    var storage = window.localStorage;


    $scope.load = function (number){

      if($scope.tournamentId == null){
        alert("Wrong Id");
      } else {
        var loginUrl = "https://sso.pokemon.com/sso/login?locale=en-gb&service=https://www.pokemon.com/uk/pokemon-trainer-club/caslogin";

        var tournamentUrl = "https://www.pokemon.com/uk/play-pokemon/pokemon-events/" + $scope.tournamentId + "/";
        var url = "http://anyorigin.com/go?url=" + encodeURIComponent(tournamentUrl) + name + "&callback=?";
        var name = "codemzy";
        $.get(url, function(response) {
          console.log(response);
        });
      }

    };
    $scope.init = function(){

    }
    $window.onload = $scope.init();
}]);
