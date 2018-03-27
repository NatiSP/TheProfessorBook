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
}

function loadHPCalc(){
  hideAll();
  $("#HPCalcTab").removeClass("d-none");
  $('.menu').toggleClass('menu-active');
}

function loadPenalties(){
  hideAll();
  $("#penaltyTab").removeClass("d-none");
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

$("#button").click(function() {
  $('.menu').toggleClass('menu-active');
});
