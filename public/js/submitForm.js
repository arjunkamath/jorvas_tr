$('#gotoDB').click(function() {
	
	if(localStorage.getItem("istoggleActive") == "yes"){
		alert("Sorry, you cannot navigate while timer is active")
		return;
	}

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
	//$.get("/", function(data){
	//	$( ".content" ).empty();
	//	$( ".content" ).append(data);
	//});

	//pressback();
	var url = "https://jorvas.herokuapp.com/"
	window.location = url;

	console.log("home pressed");

	if(!$("#gotoHome").hasClass('active')){
        $("#gotoHome").addClass('active');
    }

    if($("#gotoDB").hasClass('active')){
        $("#gotoDB").removeClass('active');
    } else if($("#gotoHelp").hasClass('active')){
        $("#gotoHelp").removeClass('active');
    }
	
	//location.reload();
});

$('#gotoHelp').click(function() {

	if(localStorage.getItem("istoggleActive") == "yes"){
		alert("Sorry, you cannot navigate while timer is active")
		return;
	}

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
	//console.log(e.detail.isActive);

	if(e.detail.isActive){
		toggleActive();
	} //if user stops timer
	else {
		toggleInactive();
	}
});

function pressback(){
	parent.history.back();
	return false;
}