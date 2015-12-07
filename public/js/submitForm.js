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
	$.post("/ownDB", {signum : localStorage.getItem("signum")}, function(data){
		//console.log(data);
		//$(".result").html( data );
		//var content = $( data ).find( "#content" );
   		//$( "#result" ).empty().append( data );
   		$( ".content" ).append( data );
	});

	//toggle Active visual on top tab
	if(!$("#gotoDB").hasClass('active')){
        $("#gotoDB").addClass('active');
    }

    if($("#gotoHome").hasClass('active')){
        $("#gotoHome").removeClass('active');
    } else if($("#gotoHelp").hasClass('active')){
        $("#gotoHelp").removeClass('active');
    }

});

$('#gotoHome').click(function() {
	$.get("/", function(data){
		$( ".content" ).append( data );
	});

	if(!$("#gotoHome").hasClass('active')){
        $("#gotoHome").addClass('active');
    }

    if($("#gotoDB").hasClass('active')){
        $("#gotoDB").removeClass('active');
    } else if($("#gotoHelp").hasClass('active')){
        $("#gotoHelp").removeClass('active');
    }
	
});

$('#gotoHelp').click(function() {

	console.log("goto Help");
	$.get("/help", function(data){
		console.log(data)
		$( ".content" ).empty();
		$( ".content" ).append(data);
	});
	
	if(!$("#gotoHelp").hasClass('active')){
        $("#gotoHelp").addClass('active');
    }

    if($("#gotoDB").hasClass('active')){
        $("#gotoDB").removeClass('active');
    } else if($("#gotoHome").hasClass('active')){
        $("#gotoHome").removeClass('active');
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
.addEventListener('toggle', function toggleActivity(e) {
	//console.log(e);
	console.log(e.detail.isActive);

	if(e.detail.isActive){
		toggleActive();
	} //if user stops timer
	else {
		toggleInactive();
	}
});

