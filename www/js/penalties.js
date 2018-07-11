professorApp.controller("penaltyCtrl", ['$scope','$window','$http',
	function($scope,$window, $http) {	
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
			$("#msPenaltyInfo").empty();
			$("#penaltyForm").removeClass("d-none");
		};

		$scope.addPenalty = function(){
			storage.setItem("currentPenalty", -1);
			cargarPenalty();
			
			$("#penaltyTab").addClass("d-none");
			$("#msPenaltyInfo").empty();
			$("#penaltyForm").removeClass("d-none");
		};
		
		$scope.goToExport = function(){			
			$("#penaltyTab").addClass("d-none");
			$("#msPenaltyInfo").empty();
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
		
		msMandatory  = '<div class="alert alert-warning alert-dismissible" >'
						+ '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
						+ 'Please, fill all required fields.</div>';
		
		$scope.savePenalty = function(){
			$("#msPenaltyInfo").empty();
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
				$("#msPenaltyInfo").html(msMandatory);
				
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
		
		function comprobarCamposObligaExcel(){
			return $("#eventId").val() != "" && $("#eventDate").val() != ""
				$("#organizerName").val() != "" && $("#organizerId").val() != "";
		}
		
		$scope.exportToExcel=function(){
			$("#msPenaltyExport").empty();
			validado = comprobarCamposObligaExcel();

			if (validado){
				mensaje = '<div class="alert alert-danger alert-dismissible" >'
					+ '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
					+ 'There are a problem exporting. Please, try again later.</div>';
				
				/*console.log("hola");				
				var wb = XLSX.readFile('docs/penaltySummary.xlsx');
				console.log("hola 2");	
				first_sheet_name = wb.SheetNames[0];					        
				var worksheet = wb.Sheets[first_sheet_name];
				rellenarCeldas(worksheet);
				console.log("hola 3");				
				XLSX.writeFile(wb, 'out.xlsx');
				console.log("hola 4");	
				loadPenalties();*/
				
				$http({
					method:'GET',
					url:'https://cors-anywhere.herokuapp.com/https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1TXjJ_gjZhkxjtUk70UghLnpTrYZ9i6Qs',
					responseType:'arraybuffer'
				  }).then(function(d) {
						var data = new Uint8Array(d.data);
						var wb = XLSX.read(data, {type:"array", cellStyles:true});
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
				  }, function(err) { 
						console.log(err);						
						$("#msPenaltyExport").html(mensaje);
				  });
			} else {
				$("#msPenaltyExport").html(msMandatory);
			}
		 
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
