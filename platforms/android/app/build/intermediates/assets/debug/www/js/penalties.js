professorApp.controller("penaltyCtrl", ['$scope','$window',
	function($scope,$window) {
		var storage = window.localStorage;

		if (storage.getItem("listPenalties") == undefined){
			$scope.listPenalties = [];
		} else {
			$scope.listPenalties = angular.fromJson(storage.getItem("listPenalties"));
		}


		$scope.reset = function(){
			$scope.listPenalties = [];
			storage.setItem("listPenalties", angular.toJson($scope.listPenalties));
		};

		$scope.deletePenalty = function(id){
			// Añadir alert

			for (var i = 0; i < $scope.listPenalties.length; i++) {
				var actualPenalty = $scope.listPenalties[i];
				if (actualPenalty.id == id){
					$scope.listPenalties.splice(i,1);
					break;
				}
			}

			storage.setItem("listPenalties", angular.toJson($scope.listPenalties));
		};

		$scope.modifyPenalty = function(id){
			storage.setItem("currentPenalty", id);
			$("#penaltyTab").addClass("d-none");
		  $("#penaltyForm").removeClass("d-none");
		};

		$scope.addPenalty = function(){
			storage.setItem("currentPenalty", -1);
			$("#penaltyTab").addClass("d-none");
			$("#penaltyForm").removeClass("d-none");
		};

	}]);
