var psApp = angular.module("psApp", []);
psApp.controller("psCtrl", ['$scope','$window',
  function($scope,$window) {
      // $scope.team1 = [
      //   { currentPS: null, totalPS: null },
      //   { currentPS: null, totalPS: null },
      //   { currentPS: null, totalPS: null },
      //   { currentPS: null, totalPS: null }
      // ];
      // $scope.team2 = [
      //   { currentPS: null, totalPS: null },
      //   { currentPS: null, totalPS: null },
      //   { currentPS: null, totalPS: null },
      //   { currentPS: null, totalPS: null }
      // ];
      $scope.team1 = [];
      $scope.team2 = [];

      $scope.numPreference = parseInt(window.localStorage.getItem("pokeNumber"));
      if($scope.numPreference == null){
        $scope.numPreference = 4;
      }

      $scope.init = function(){
        $scope.team1 = [];
        $scope.team2 = [];
        for(var i=0; i<$scope.numPreference; i++){
          $scope.team1.push({ currentPS: null, totalPS: null });
          $scope.team2.push({ currentPS: null, totalPS: null });
          console.log($scope.team1);
        }
      };
      $scope.setPokeNumber = function (number){
        var storage = window.localStorage;
        storage.setItem("pokeNumber", number);
        console.log(storage.getItem("pokeNumber"));
        $scope.numPreference = number;
        $scope.init();
      };
      $window.onload = $scope.init();
      $scope.currentPSTeam1 = 0;
      $scope.currentPSTeam2 = 0;
      $scope.totalPSTeam1 = 0;
      $scope.totalPSTeam2 = 0;
      $scope.result = 'Draw';
      $scope.calc = function() {
        console.log('Lets calc');
        $scope.currentPSTeam1 = 0;
        $scope.currentPSTeam2 = 0;
        $scope.totalPSTeam1 = 0;
        $scope.totalPSTeam2 = 0;
        for(var i=0; i<$scope.team1.length; i++){
          if($scope.team1[i].currentPS != null){
            $scope.currentPSTeam1 += parseInt($scope.team1[i].currentPS);
          }
          if($scope.team1[i].totalPS != null){
            $scope.totalPSTeam1 += parseInt($scope.team1[i].totalPS);
          } else {
            $scope.result = 'Not enough data';
            alert('Not enough data.');
            return;
          }

        }
        for(var i=0; i<$scope.team2.length; i++){
          if($scope.team2[i].currentPS != null){
            $scope.currentPSTeam2 += parseInt($scope.team2[i].currentPS);
          }
          if($scope.team2[i].totalPS != null){
            $scope.totalPSTeam2 += parseInt($scope.team2[i].totalPS);
          } else {
            $scope.result = 'Not enough data';
            alert('Not enough data.');
            return;
          }
        }
        if($scope.totalPSTeam1 == null || $scope.totalPSTeam2 == null || isNaN($scope.totalPSTeam1) || isNaN($scope.totalPSTeam2)){
          $scope.result = 'Not enough data';
          alert('Not enough data.');
        } else if(($scope.currentPSTeam1 / $scope.totalPSTeam1) == ($scope.currentPSTeam2 / $scope.totalPSTeam2)){
          $scope.result = 'Draw';
        } else {
          $scope.result = (($scope.currentPSTeam1 / $scope.totalPSTeam1) > ($scope.currentPSTeam2 / $scope.totalPSTeam2)) ? 'Player 1 Wins' : 'Player 2 Wins';
        }

      };
  }]);
