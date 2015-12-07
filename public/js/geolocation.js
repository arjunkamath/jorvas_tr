/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
//console.log("geolocation called first");

$(document).ready(function() {
    //console.log("geolocation called");
    console.log(localStorage.getItem("signum"));
    $("#displayedSignum").text(localStorage.getItem("signum"));

    getSignumRecursive();
  
    var jorvasPosLat = 60.1302003;
    var jorvasPosLong = 24.51244;
    var distance;
    var radialAllowance = 1;
    //var lastInJorvas =  null;
    //var savedEntryTime = null;
    //var savedExitTime = null;

    console.log("Today's date: " + moment().format('L'));

    $("#displayedDate").text("w" + moment().format("ww ddd, D MMM YYYY"));

    //if associatedDate is today, display values to user
    if(localStorage.getItem("associatedDate") == moment().format('L')){
      $("#entryTime").text(localStorage.getItem("savedEntryTime"));
      $("#exitTime").text(localStorage.getItem("savedExitTime"));  
      $("#entryExitDiff").text(localStorage.getItem("savedEntryExitDiff"));
      $("#totalHours").text(localStorage.getItem("savedHours"));
    } else {
      $("#entryTime").text(" ");
      $("#exitTime").text(" ");
      $("#entryExitDiff").text(" ");
      $("#totalHours").text("00:00");
    }
    
    //this is the default text
    $("#locationText").text("Please turn on your GPS")

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        console.log("watch position called")

        distance = calculateDistance(jorvasPosLat, jorvasPosLong, position.coords.latitude, position.coords.longitude)
        console.log(position.coords.latitude + " " + position.coords.longitude)
        console.log(distance)

        if(distance < radialAllowance){
          $("#locationText").text("You are in Jorvas");
          if(!$("#timerToggle").hasClass('active')){
            $("#timerToggle").addClass('active');
            toggleActive();
          } 
        } else {
          $("#locationText").text("You are not in Jorvas");
          //if ($("#timerToggle").hasClass('active')) {
          //  $("#timerToggle").removeClass('active');
          //  toggleInactive();  
        }
      });
    }
});

// Reused code - copyright Moveable Type Scripts - retrieved May 4, 2010.
// http://www.movable-type.co.uk/scripts/latlong.html
// Under Creative Commons License http://creativecommons.org/licenses/by/3.0/
function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

function getCurrentTime () {
  return (moment().format("HH:mm"));
}

function toggleActive(){
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
}

function toggleInactive(){
  localStorage.setItem("savedExitTime", getCurrentTime());
  $("#exitTime").text(localStorage.getItem("savedExitTime"));

  var now = moment(localStorage.getItem("savedExitTime"), "HH:mm");
  var then = moment(localStorage.getItem("savedEntryTime"), "HH:mm");
  var diff = (moment.utc(now.diff(then))).format("HH:mm");
  
  console.log(diff);
  localStorage.setItem("savedEntryExitDiff", diff);
  $("#entryExitDiff").text(localStorage.getItem("savedEntryExitDiff"));
  
  //Add diff to saved hours

  //var addHours = moment(moment(localStorage.getItem("savedHours"), "HH:mm")).add(diff);

  var dur1 = moment.duration(localStorage.getItem("savedEntryExitDiff"));
  var dur2 = moment.duration(localStorage.getItem("savedHours"));
  var addHours = (moment(dur1.add(dur2))).format("HH:mm");

  localStorage.setItem("savedHours", addHours);
  $("#totalHours").text(localStorage.getItem("savedHours"));

  console.log(localStorage.getItem("savedHours"));

  //Also save this to database
  $.post("/saveData", {signum : localStorage.getItem("signum"), 
    todayDay : localStorage.getItem("associatedDate"), 
    entryTime : localStorage.getItem("savedEntryTime"), 
    exitTime : localStorage.getItem("savedExitTime")
  });
}
