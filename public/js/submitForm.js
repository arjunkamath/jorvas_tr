var signumForm = $('#signum').val();
var dayForm = localStorage.getItem("todayDay");
var entryTimeForm = localStorage.getItem("savedEntryTime");
var exitTimeForm = localStorage.getItem("savedExitTime");

console.log(signumForm);
console.log(dayForm);
console.log(entryTimeForm);
console.log(exitTimeForm);

$('#submit').click(function() {
	$.post("/saveData", {signum : signumForm, todayDay : dayForm, entryTime : entryTimeForm, exitTime : exitTimeForm});
}