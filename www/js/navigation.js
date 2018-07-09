var timerGage;

// process the confirmation dialog result
function onConfirm(buttonIndex) {
    if(buttonIndex == "Yes"){
      navigator.app.exitApp();
    }
}

// Show a custom confirmation dialog
//
function askForExit() {
    navigator.notification.confirm(
        'You want to exit?', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Exit',           // title
        ['Yes','No']         // buttonLabels
    );
}

function hideAll(){
  $('.menu').toggleClass('menu-active');
  $(".navbar-collapse").collapse('hide');
  $("#indexTab").addClass("d-none");
  $("#rulesTab").addClass("d-none");
  $("#timerTab").addClass("d-none");
  $("#HPCalcTab").addClass("d-none");
  $("#penaltyTab").addClass("d-none");
  $("#penaltyForm").addClass("d-none");
  $("#penaltyExcel").addClass("d-none");
  $("#settingsTab").addClass("d-none");
}

function loadIndex(){
  hideAll();
  $("#indexTab").removeClass("d-none");
  $('.menu').toggleClass('menu-active');
}

function loadRules(){
  hideAll();
  $("#rulesTab").removeClass("d-none");
  $('.menu').toggleClass('menu-active');
}

function loadTimer(){
  hideAll();
  $("#timerTab").removeClass("d-none");
  $('.menu').toggleClass('menu-active');
  if(timerGage == null){
    timerGage = new JustGage({
      id: "gg1",
      value: 3000,
      min: 0,
      max: 3000,
      hideMinMax: true,
      donut: true,
      pointer: true,
      counter: true,
      customSectors: [{
        color : "#ff0000",
        lo : 0,
        hi : 300
      },{
        color : "#00ff00",
        lo : 300,
        hi : 3000
      }],
      textRenderer: getCurrentTime,
      relativeGaugeSize: true
    });
    timerGage.refresh(3000);
  }

}

function loadHPCalc(){
  hideAll();
  $("#HPCalcTab").removeClass("d-none");
  $('.menu').toggleClass('menu-active');
}

function loadPenalties(){
	hideAll();
	$("#penaltyTab").trigger("loadListPenalty");
	$('.menu').toggleClass('menu-active');
}

function loadSettings(){
  hideAll();
  $("#settingsTab").removeClass("d-none");
  $('.menu').toggleClass('menu-active');
}

// handle the back button
function handleBackButton() {
if($("#indexTab").hasClass("d-none")){
  loadIndex();
} else {
  navigator.app.exitApp();
}

}

var getCurrentTime = function (){
  var minutes = Math.floor(3000 / 60);
  var seconds = 3000 - minutes * 60;
  return (new Array(2+1).join('0')+minutes).slice(-2) + ':' + (new Array(2+1).join('0')+seconds).slice(-2);
}

$("#button").click(function() {
  $('.menu').toggleClass('menu-active');
});

// setup a logfile path (required)
// this path is relative to your device sdcard storage directory
window.logToFile.setLogfilePath('/ProfessorBook/log.txt', function () {
    // logger configured successfully
}, function (err) {
    // logfile could not be written
    // handle error
});
