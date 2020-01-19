
professorApp.controller("settingsCtrl", ['$scope','$window',
  function($scope,$window) {

    var storage = window.localStorage;
  $scope.pokeNumber = storage.getItem("pokeNumber");
  $scope.bo1 = storage.getItem('bo1');
  $scope.bo3 = storage.getItem('bo3');
  if(storage.getItem("rules") != undefined) {
	  $scope.rules = new Map(JSON.parse(storage.getItem("rules")));
	} else {
	  $scope.rules = new Map([
		  ['vgRules','https://assets.pokemon.com//assets/cms2/pdf/play-pokemon/rules/play-pokemon-vg-rules-formats-and-penalty-guidelines-12042019-en.pdf'],
		  ['sanctioningRegulations','https://assets.pokemon.com//assets/cms2/pdf/play-pokemon/rules/play-pokemon-tournament-sanctioning-regulations-10232019-en.pdf'],
		  ['toProcedures','https://assets.pokemon.com//assets/cms2/pdf/play-pokemon/rules/play-pokemon-tournament-operation-procedures-10232019-en.pdf'],
		  ['vgList','https://assets.pokemon.com//assets/cms2/pdf/play-pokemon/rules/play-pokemon-vg-team-list-2020.pdf'],
		  ['tcgRules','https://assets.pokemon.com//assets/cms2/pdf/play-pokemon/rules/play-pokemon-tcg-rules-and-formats-10232019-en.pdf'],
		  ['tcgPenalties','https://assets.pokemon.com//assets/cms2/pdf/play-pokemon/rules/play-pokemon-tcg-penalty-guidelines-10232019-en.pdf'],
		  ['tcgList','https://assets.pokemon.com//assets/cms2/pdf/play-pokemon/rules/play-pokemon-deck-list-a4-cec.pdf']
	  ]);
	  storage.setItem("rules", JSON.stringify(Array.from($scope.rules.entries())));
	}

  $scope.setPokeNumber = function (number){
    var storage = window.localStorage;
    storage.setItem("pokeNumber", number);
    console.log(storage.getItem("pokeNumber"));
    $scope.pokeNumber = number;
  };
  
  $scope.setRulesUrl = function (ruleset, url) {
	  console.log("URL changed to " + url);
	  $scope.rules.set(ruleset, url);
	  storage.setItem("rules", JSON.stringify(Array.from($scope.rules.entries())));
  }
  
  $scope.saveChanges = function() {
	  storage.setItem("rules", JSON.stringify(Array.from($scope.rules.entries())));
  }
  
  $scope.setTimer = function(bo, time){
	  if (!isNaN(time)){
		  storage.setItem(bo, time);
	  } else {
		  alert("Entered value is not a number");
	  }
  }
  
  $scope.getRulesUrl = function getRulesUrl(ruleset) {
	  return $scope.rules.get(ruleset);
  }
  
  $scope.openRules = function openRules(ruleset) {
	  window.open(getRulesUrl(ruleset), '_blank');
  }
  
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
