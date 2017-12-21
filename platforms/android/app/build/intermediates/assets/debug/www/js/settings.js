function setPokeNumber(number){
  var storage = window.localStorage;
  storage.setItem("pokeNumber", number);
};

$(document).ready(function(){
  var storage = window.localStorage;
  var numPreference = storage.getItem("pokeNumber");
  var buttonSelected = '#pokeNumberOption' + numPreference;
  $(buttonSelected).addClass('active');
});
