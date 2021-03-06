/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
//console.log("geolocation called first");

document.addEventListener('DOMContentLoaded', function() {
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
    console.log("associated date " + localStorage.getItem("associatedDate") );

    //set display date to today
    $("#displayedDate").text("w" + moment().format("ww ddd, D MMM YYYY"));

    //if associatedDate is today, display values to user
    if(localStorage.getItem("associatedDate") == moment().format('L')){
      $("#entryTime").text(localStorage.getItem("savedEntryTime"));
      $("#exitTime").text(localStorage.getItem("savedExitTime"));  
      $("#entryExitDiff").text(localStorage.getItem("savedEntryExitDiff"));
      $("#totalHours").text((localStorage.getItem("savedHours")).slice(0,4));
    } else {
      $("#entryTime").text(" ");
      $("#exitTime").text(" ");
      $("#entryExitDiff").text(" ");
      $("#totalHours").text("0.0");

      localStorage.setItem("savedHours", "0.0");
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
          //toggleActive();
        } else {
          $("#locationText").text("You are not in Jorvas");
          //toggleInactive(); 
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

  // don't actvate if active
  if(localStorage.getItem("istoggleActive") == "yes"){
    return;
  }

  localStorage.setItem("istoggleActive", "yes");

  if(!$("#timerToggle").hasClass('active')){
    $("#timerToggle").addClass('active');
  } 

  //user logs in for first time, and there's no associated date data
  if (localStorage.getItem("associatedDate") == null){
    //set associatedDate to this day
    localStorage.setItem("associatedDate", moment().format('L'));
    localStorage.setItem("savedEntryTime", getCurrentTime());
    $("#entryTime").text(localStorage.getItem("savedEntryTime"));
  } else {
    //if associatedDate is not today, clean everything
    if(localStorage.getItem("associatedDate") != moment().format('L')){
      console.log("Logging in first time today");

      //set display date to today and savedHours to 0 in case missed before
      $("#displayedDate").text("w" + moment().format("ww ddd, D MMM YYYY"));
      localStorage.setItem("savedHours", "0.0");

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
      //localStorage.setItem("savedEntryExitDiff", " ");

      $("#entryTime").text(localStorage.getItem("savedEntryTime"));
      $("#exitTime").text(localStorage.getItem("savedExitTime"));
      $("#entryExitDiff").text(" ");
    }
  }
}

function toggleInactive(){

  // don't inactvate if inactive
  if(localStorage.getItem("istoggleActive") == "no"){
    return;
  }

  localStorage.setItem("istoggleActive", "no");

  if($("#timerToggle").hasClass('active')){
    $("#timerToggle").removeClass('active');
  }

  localStorage.setItem("savedExitTime", getCurrentTime());
  $("#exitTime").text(localStorage.getItem("savedExitTime"));

  var now = moment(localStorage.getItem("savedExitTime"), "HH:mm");
  var then = moment(localStorage.getItem("savedEntryTime"), "HH:mm");
  var diff = (moment.utc(now.diff(then))).format("HH:mm");
 
  console.log('old savedHours ' + localStorage.getItem("savedHours"));
  //console.log('old savedEntryExitDiff ' + localStorage.getItem("savedEntryExitDiff"));
  //console.log('Diff in format ' + diff);
  
  localStorage.setItem("savedEntryExitDiff", diff);
  $("#entryExitDiff").text(localStorage.getItem("savedEntryExitDiff"));

  console.log('savedEntryExitDiff ' + localStorage.getItem("savedEntryExitDiff"));
  
  var newDur = moment.duration(localStorage.getItem("savedEntryExitDiff"));
  var sumDur = moment.duration(Number(localStorage.getItem("savedHours")), 'h');
  var totalDur = moment.duration(newDur.add(sumDur)).asHours();

  localStorage.setItem("savedHours", totalDur);
  console.log('savedHours ' + localStorage.getItem("savedHours"));

  $("#totalHours").text((localStorage.getItem("savedHours")).slice(0,4));

  //Also save this to database, unless diff is 00 meaning, user is playing around
  if(localStorage.getItem("savedEntryExitDiff") != "00:00"){
    $.post("/saveData", {signum : localStorage.getItem("signum"), 
      todayDay : localStorage.getItem("associatedDate"), 
      entryTime : localStorage.getItem("savedEntryTime"), 
      exitTime : localStorage.getItem("savedExitTime"),
      diff : localStorage.getItem("savedEntryExitDiff")
    });  
  }
  
}
