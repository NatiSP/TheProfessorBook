var timerApp = angular.module("timerApp", []);
timerApp.controller("timerCtrl", ['$scope','$timeout',
  function($scope,$timeout) {
      $scope.counter = 3000;
      $scope.time = 100 ;
      $scope.timeLimit = 3000;
      var stopped;
      $scope.status = 'stop';
      $scope.start = function() {
        $scope.status = "start";
        stopped = $timeout(function() {
          if($scope.counter > 0){
            console.log($scope.counter + " " + $scope.time);
            $scope.counter--;
            $scope.time = $scope.counter * 100 / $scope.timeLimit;
            $scope.start();
          }
        }, 1000);
      };
      $scope.stop = function(){
       $timeout.cancel(stopped);
       $scope.status = "stop";
      }

      $scope.reset= function(){
          $scope.counter = $scope.timeLimit;
          mytimeout = $timeout($scope.onTimeout,1000);
          $scope.time = $scope.counter * 100 / $scope.timeLimit;
      }

      $scope.setTime= function(timeSet){

        if($scope.status == "stop"){
          $scope.timeLimit = timeSet;
          $scope.reset();
        }
      }

  }]);

timerApp.filter('secondsToDateTime', [function() {
      return function(seconds) {
          return new Date(1970, 0, 1).setSeconds(seconds);
      };
  }])
