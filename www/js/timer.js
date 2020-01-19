
professorApp.controller("timerCtrl", ['$scope','$timeout',
  function($scope,$timeout) {
	  var isMobile = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;

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
      //$scope.timerGage = timerGage;
      $scope.start = function() {
      //  if(typeof $scope.timerGage != 'undefined' && $scope.timerGage != null){
          //$scope.timerGage.refresh($scope.counter, $scope.timeLimit);
        //  $scope.timerGage.refresh($scope.counter);
        //} else {
          //$scope.timerGage = timerGage;
        //}
        if($scope.status != "start"){
          $scope.status = "start";
          storage.setItem("statusTimer", $scope.status);

          $scope.startTime = new Date().getTime();
          storage.setItem("startTime", $scope.startTime);
        } else {
          $scope.startTime = storage.getItem("startTime");
        }
        stopped = $timeout(function() {
          if($scope.counter == 0){
            //window.logToFile.debug("Timer ended!");
            console.log("Timer ended!");
            navigator.vibrate(5000);
			if(isMobile) {
				cordova.plugins.notification.local.schedule({
					id: 1,
					title: 'Professor Book: Time is up!',
					text: 'Time is up!',
					led: { color: '#FF00FF', on: 500, off: 500 },
					foreground: false,
					vibrate: true
				});
			} else {
				alert('Professor Book: Time is up!');
			}
			
          }
          //if($scope.counter > 0){
            //window.logToFile.debug($scope.counter + " " + $scope.time);
            console.log($scope.counter + " " + $scope.time);
            $scope.counter = $scope.timeLimit - (((new Date().getTime() - $scope.startTime) / 1000) | 0);
            $scope.time = 100 * ($scope.counter/$scope.timeLimit);
            if ($scope.counter <= 0) {
                $scope.startTime = Date.now() + 1000;
            }
            $scope.start();
          //}
        }, 1000);
		cordova.plugins.notification.local.schedule({
			id: 2,
			title: 'Round timer: ' + $scope.getCurrentTime(),
			text: $scope.getCurrentTime(),
			progressBar: { value: ($scope.counter/$scope.timeLimit) * 100 }
		});

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
		var time = storage.getItem(timeSet);
		if(time == undefined){
			storage.setItem('bo1', 20);
			storage.setItem('bo3', 50);
		}

        if($scope.status == "stop"){
          $scope.timeLimit = time * 60;
          $scope.reset();
        }
      }

      $scope.getCurrentTime = function(time){
        var sign = "";
        if(time == null){
          if($scope.counter >= 0){
            var minutes = Math.floor($scope.counter / 60);
            var seconds = $scope.counter - minutes * 60;
          }
          else{
            var minutes = Math.abs(Math.ceil($scope.counter / 60));
            var seconds = Math.abs($scope.counter - minutes * 60);
            sign = "-";
          }
        } else {
          if(time >= 0){
            var minutes = Math.floor(time / 60);
            var seconds = Math.abs(time - minutes * 60);
          }
          else{
            var minutes = Math.abs(Math.ceil(time / 60));
            var seconds = Math.abs(time - minutes * 60);
            sign = "-";
          }

        }
        console.log("Time:" + sign + minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds));
        return sign + minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds);
      }

  }]);

professorApp.filter('secondsToDateTime', [function() {
      return function(seconds) {
          return new Date(1970, 0, 1).setSeconds(seconds);
      };
  }])
