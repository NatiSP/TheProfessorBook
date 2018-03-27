professorApp.controller("penaltyFormCtrl", ['$scope','$window',
	function($scope,$window) {
		var storage = window.localStorage;
		var listPenalties = angular.fromJson(storage.getItem("listPenalties"));
		var idPenalty = getRealId();

		if (idPenalty != -1){
			$scope.penalty = listPenalties[idPenalty];
		} else {
			var newId = getNewId();
			$scope.penalty = getPenalty(newId, "","","","","","");
		}


		function getPenalty(id, playerName,playerId,level,type,severity,comments){
			var penalty = {id: id,
						playerName: playerName,
						playerId: playerId,
						type: type,
						level: level,
						severity: severity,
						comments: comments};
			return penalty;
		};

		$scope.savePenalty = function(){
			if (listPenalties == null){
				listPenalties = [];
				listPenalties.push($scope.penalty);
			} else {
				// Comprobar si es un registro nuevo o una modificación
				if (idPenalty == -1) {
					listPenalties.push($scope.penalty);
				} else {
					listPenalties[idPenalty] = $scope.penalty;
				}
			}

			storage.setItem("listPenalties", angular.toJson(listPenalties));
			$("#penaltyTab").removeClass("d-none");
			$("#penaltyForm").addClass("d-none");
		};

		function getNewId(){
			if (listPenalties == null){
				return 0;
			}

			var maxId = 0;
			for (var i = 0; i < listPenalties.length; i++) {
				var actualPenalty = listPenalties[i];
				if (actualPenalty.id > maxId){
					maxId = actualPenalty.id;
				}
			}

			return maxId + 1;
		}

		function getRealId(){
			var id = parseInt(storage.getItem("currentPenalty"));

			if (id == -1){
				return id;
			}

			for (var i = 0; i < listPenalties.length; i++) {
				if (listPenalties[i].id == id){
					return i;
				}
			}

		}

	}]);
