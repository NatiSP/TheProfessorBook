professorApp.controller("penaltyCtrl", ['$scope','$window',
	function($scope,$window, Excel, $timeout) {	
		var storage;
		var listPenalties;
		var idPenalty;
		$scope.listPenalties = obtenerListaFromStorage();
		
		$("#penaltyTab").on("loadListPenalty", function(){
			cargarListaPenalties();
		});
	
		function cargarListaPenalties(){
			$("#penaltyTab").removeClass("d-none");
			$scope.listPenalties = obtenerListaFromStorage();						
		}
		
		function obtenerListaFromStorage(){
			// Inicializar lista de Penalties
			storage = window.localStorage;
			if (storage.getItem("listPenalties") == undefined){
				return [];
			} else {
				return angular.fromJson(storage.getItem("listPenalties"));
			}
		}
		
		$scope.reset = function(){
			$scope.listPenalties = [];
			storage.setItem("listPenalties", angular.toJson($scope.listPenalties));
		};

		$scope.deletePenalty = function(id){
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
			cargarPenalty();
			$("#penaltyTab").addClass("d-none");
			$("#msPenaltyInfo").addClass("d-none");
			$("#penaltyForm").removeClass("d-none");
		};

		$scope.addPenalty = function(){
			storage.setItem("currentPenalty", -1);
			cargarPenalty();
			
			$("#penaltyTab").addClass("d-none");
			$("#msPenaltyInfo").addClass("d-none");
			$("#penaltyForm").removeClass("d-none");
		};
		
		$scope.goToExport = function(){			
			$("#penaltyTab").addClass("d-none");
			$("#msPenaltyInfo").addClass("d-none");
			$("#penaltyExcel").removeClass("d-none");
		};
		
		function cargarPenalty(){
			listPenalties = angular.fromJson(storage.getItem("listPenalties"));
			idPenalty = getRealId();

			if (idPenalty != -1){
				$scope.penalty = listPenalties[idPenalty];
			} else {
				var newId = getNewId();
				$scope.penalty = {id: newId,
						playerName: "",
						playerId: "",
						type: "",
						level: "",
						severity: "",
						judgeId: "",
						judgeName: "",
						date: getDate(null),
						round: "",
						additional: "",
						comments: ""};
			}
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
		
		$scope.savePenalty = function(){
			$("#msPenaltyInfo").addClass("d-none");
			validado = comprobarCamposObligatorios();
			
			if (validado){
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
				$("#penaltyForm").addClass("d-none");
				cargarListaPenalties();
			} else {
				$("#msPenaltyInfo").removeClass("d-none");
			}
		};
		
		function getDate(date){
			var d = date;
			if (date == null){
				d = new Date();
			}
            return d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
		}
		
		function comprobarCamposObligatorios(){
			penaltyActual = $scope.penalty;
			return penaltyActual.playerName != "" && penaltyActual.playerId != ""
				&& penaltyActual.judgeName != "" && penaltyActual.judgeId != ""
				&& penaltyActual.type != "" && penaltyActual.level != "" && penaltyActual.severity != "";
		}
		
		$scope.exportToExcel=function(){			
			var file = $("#excelFile")[0].files[0];
			  
			var reader = new FileReader();
			var name = file.name;
			reader.onload = function(e) {
				var data = e.target.result;

				var wb = XLSX.read(data, {type: 'binary', cellStyles:true});
				first_sheet_name = wb.SheetNames[0];
			
				var wopts = { bookType:'xlsx', cellStyles:true, bookSST:false, type:'binary' };            
				var worksheet = wb.Sheets[first_sheet_name];
				rellenarCeldas(worksheet);
					
				var wbout = XLSX.write(wb,wopts);

				function s2ab(s) {
					var buf = new ArrayBuffer(s.length);
					var view = new Uint8Array(buf);
					for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
					return buf;
				}

				var fileName = "penaltySummary" + getDate(null) + ".xlsx";				
				saveAs(new Blob([s2ab(wbout)],{type:""}), fileName);
				
				loadPenalties();
			};
			
			reader.readAsBinaryString(file);  
		};

		
		function rellenarCeldas(worksheet){
			// Cabecera
			obtenerCelda($scope.eventId, worksheet["H2"]);
			fecha = getDate($scope.eventDate);
			obtenerCelda(fecha, worksheet["H3"]);
			obtenerCelda($scope.organizerName, worksheet["L2"]);
			obtenerCelda($scope.organizerId, worksheet["L3"]);
			
			var listPenalties = $scope.listPenalties;			
			for (var indice = 0; indice < listPenalties.length ; indice++){
				numFila = indice + 6;
				
				obtenerCelda(listPenalties[indice].judgeName, worksheet["B"+numFila]);
				obtenerCelda(listPenalties[indice].judgeId, worksheet["C"+numFila]);
 				obtenerCelda(listPenalties[indice].playerName, worksheet["D"+numFila]);
				obtenerCelda(listPenalties[indice].playerId, worksheet["E"+numFila]);
				obtenerCelda(listPenalties[indice].level, worksheet["F"+numFila]);
				obtenerCelda(listPenalties[indice].type, worksheet["G"+numFila]);
				obtenerCelda(listPenalties[indice].severity, worksheet["H"+numFila]);
				obtenerCelda(listPenalties[indice].date, worksheet["I"+numFila]);
				obtenerCelda(listPenalties[indice].round, worksheet["J"+numFila]);
				obtenerCelda(listPenalties[indice].additional, worksheet["K"+numFila]);
				obtenerCelda(listPenalties[indice].comments, worksheet["L"+numFila]);			
	
			}
		}
		
		function obtenerCelda(val, celda){
			celda.t = "s";
			celda.h = "<b>"+val+"</b>";
			celda.v = val;
		}
		
	}]);
