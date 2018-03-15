var timerApp = angular.module("timerApp", []);
timerApp.controller("timerCtrl", ['$scope','$timeout',
  function($scope,$timeout) {
      var storage = window.localStorage;
      $scope.counter = 3000;
      $scope.time = 100 ;
      $scope.timeLimit = 3000;
      var stopped;
      $scope.status = storage.getItem("statusTimer");
      if($scope.status == null){
        $scope.status = 'stop';
        storage.setItem("statusTimer", $scope.status);
      }
      $scope.startTime = Date.now();
      $scope.start = function() {
        if($scope.status != "start"){
          $scope.status = "start";
          storage.setItem("statusTimer", $scope.status);

          $scope.startTime = new Date().getTime();
          storage.setItem("startTime", $scope.startTime);
        } else {
          $scope.startTime = storage.getItem("startTime");
        }
        stopped = $timeout(function() {
          if($scope.counter > 0){
            console.log($scope.counter + " " + $scope.time);
            $scope.counter = $scope.timeLimit - (((new Date().getTime() - $scope.startTime) / 1000) | 0);
            if ($scope.counter <= 0) {
                $scope.startTime = Date.now() + 1000;
            }
            $scope.start();
          }
        }, 1000);
      };
      if($scope.status == 'start'){
        $scope.start();
      }

      $scope.stop = function(){
       $timeout.cancel(stopped);
       $scope.status = "stop";
       storage.setItem("statusTimer", $scope.status);
       $scope.reset();
      }

      $scope.reset= function(){
          $scope.counter = $scope.timeLimit;
          mytimeout = $timeout($scope.onTimeout,1000);
          $scope.time = $scope.counter * 100 / $scope.timeLimit;
          $scope.startTime = Date.now();
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
