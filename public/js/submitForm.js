var signumForm = $('.signum').val();
var dayForm = localStorage.getItem("todayDay");
var entryTimeForm = localStorage.getItem("savedEntryTime");
var exitTimeForm = localStorage.getItem("savedExitTime");

$("#signum").change(function(){
    console.log('Typing');
});

console.log(signumForm);
console.log(document.getElementById('text').value);
console.log(dayForm);
console.log(entryTimeForm);
console.log(exitTimeForm);

$('#submit').click(function() {
	$.post("/saveData", {signum : signumForm, todayDay : dayForm, entryTime : entryTimeForm, exitTime : exitTimeForm});
});


$('#text_value').click(function() {
var text_value = $("#text").val();
if(text_value=='') {
alert("Enter Some Text In Input Field");
}else{
alert(text_value);
}
});