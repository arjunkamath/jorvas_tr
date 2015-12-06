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
			//var content = $( data ).find( "#content" );
    		//$( "#result" ).empty().append( data );
    		$( ".content" ).append( data );

		});
	}
});

function getSignumRecursive () {
  if(localStorage.getItem("signum") == null){
      var val = prompt("Please enter your signum", "eabcxyz");
      if(val == "eabcxyz"){
        getSignumRecursive();
      } else if (val != null) {
        localStorage.setItem("signum", val);
        console.log(localStorage.getItem("signum"));
        $("#displayedSignum").text(val)
      }
    }
}