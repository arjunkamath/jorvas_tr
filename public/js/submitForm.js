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
				localStorage.setItem("savedExitTime", " ");
				localStorage.setItem("associatedDate", moment().format('L'));
				localStorage.setItem("savedEntryTime", getCurrentTime());
				localStorage.setItem("savedEntryExitDiff", " ");

				$("#entryTime").text(localStorage.getItem("savedEntryTime"));
				$("#exitTime").text(localStorage.getItem("savedExitTime"));
				$("#entryExitDiff").text(localStorage.getItem("savedEntryExitDiff"));
			} // if associatedDate is today, add new row (above with old data)
			else {
				console.log(localStorage.getItem("savedEntryTime") + " " 
					+ localStorage.getItem("savedExitTime") + " "
					+ localStorage.getItem("savedEntryExitDiff") );

				$('#dailyTable tr:last').before('<tr><td>' + localStorage.getItem("savedEntryTime") + '</td><td> ' + localStorage.getItem("savedExitTime") + '</td><td>' + localStorage.getItem("savedEntryExitDiff") + '</td></tr>');
				//row = $("#dailyTable").insertRow(3);
				//var cell = row.insertCell(0);
				localStorage.setItem("savedEntryTime", getCurrentTime());
				localStorage.setItem("savedExitTime", " ");
				localStorage.setItem("savedEntryExitDiff", " ");

				$("#entryTime").text(localStorage.getItem("savedEntryTime"));
				$("#exitTime").text(localStorage.getItem("savedExitTime"));
				$("#entryExitDiff").text(localStorage.getItem("savedEntryExitDiff"));
			}
		}
	} //if user stops timer
	else {
		localStorage.setItem("savedExitTime", getCurrentTime());
		$("#exitTime").text(localStorage.getItem("savedExitTime"));

		var now = moment(localStorage.getItem("savedExitTime"), "HH:mm");
		var then = moment(localStorage.getItem("savedEntryTime"), "HH:mm");
		var diff = (moment.utc(now.diff(then))).format("HH:mm");
		
		console.log(diff);
		$("#entryExitDiff").text(diff);

		localStorage.setItem("savedEntryExitDiff", diff);
		//Also save this to database
		$.post("/saveData", {signum : localStorage.getItem("signum"), 
			todayDay : localStorage.getItem("associatedDate"), 
			entryTime : localStorage.getItem("savedEntryTime"), 
			exitTime : localStorage.getItem("savedExitTime")
		});
	}
});