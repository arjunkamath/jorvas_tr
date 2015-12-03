var dayForm = localStorage.getItem("todayDay");
var entryTimeForm = localStorage.getItem("savedEntryTime");
var exitTimeForm = localStorage.getItem("savedExitTime");

$('#submitData').click(function() {
	var text_value = $("#signumVal").val();
	if(text_value=='') {
		alert("Please enter signum");
	} else {
		//alert(text_value);
		$.post("/saveData", {signum : text_value, todayDay : dayForm, entryTime : entryTimeForm, exitTime : exitTimeForm});
	}
});

$('#gotoDB').click(function() {
	var text_value = $("#signumVal").val();
	if(text_value=='') {
		alert("Please enter signum");
	} else {
		//alert(text_value);
		$.post("/ownDB", {signum : text_value}, function(data){
			console.log(data);
			//$(".result").html( data );
			var content = $( data ).find( "#content" );
    		$( "#result" ).empty().append( content );
		});
	}
});

