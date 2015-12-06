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

document.querySelector('#timerToggle')
.addEventListener('toggle', function (e) {
	//console.log(e);
	console.log(e.detail.isActive);

	var row;

	if(e.detail.isActive){
		//user logs in for first time, and there's no associated date data
		if (localStorage.getItem("associatedDate") == null){
			//set associatedDate to this day
			localStorage.setItem("associatedDate", moment().format('L'));
			localStorage.setItem("savedEntryTime", getCurrentTime());
			$("#entryTime").text(localStorage.getItem("savedEntryTime"));
		} else {
			//if associatedDate is not today, clean everything
			if(localStorage.getItem("associatedDate") != moment().format('L')){
				localStorage.setItem("savedExitTime", null);
				localStorage.setItem("associatedDate", moment().format('L'));
				localStorage.setItem("savedEntryTime", getCurrentTime());
				$("#entryTime").text(localStorage.getItem("savedEntryTime"));
			} // if associatedDate is today, add new row (above with old data)
			else {
				$('#dailyTable tr:last').before('<tr><td>' + localStorage.getItem("savedEntryTime") + '</td><td> ' + localStorage.getItem("savedExitTime") + '</td><td>' + localStorage.getItem("entryExitDiff") + '</td></tr>');
				//row = $("#dailyTable").insertRow(3);
				//var cell = row.insertCell(0);
				localStorage.setItem("savedExitTime", null);
				localStorage.setItem("savedEntryTime", getCurrentTime());
				$("#entryTime").text(localStorage.getItem("savedEntryTime"));
			}
		}
	} //if user stops timer
	else {
		localStorage.setItem("savedExitTime", getCurrentTime());
		$("#exitTime").text(localStorage.getItem("savedExitTime"));
		$("#entryExitDiff").text(moment.duration((localStorage.getItem("savedExitTime")).diff(localStorage.getItem("savedEntryTime"))));
		//Also save this to database
		$.post("/saveData", {signum : localStorage.getItem("signum"), todayDay : localStorage.getItem("associatedDate"), entryTime : localStorage.getItem("savedEntryTime"), exitTime : localStorage.getItem("savedExitTime")});
	}
});