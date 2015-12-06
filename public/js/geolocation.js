/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
//console.log("geolocation called first");

$(document).ready(function() {
    //console.log("geolocation called");
    
    console.log(localStorage.getItem("signum"));

    getSignumRecursive();
    
    
    var jorvasPosLat = 60.1302003;
    var jorvasPosLong = 24.51244;
    var distance;
    var radialAllowance = 0.25;
    //var lastInJorvas =  null;
    //var savedEntryTime = null;
    //var savedExitTime = null;

    var now = new Date();
    localStorage.setItem("todayDay", now.toJSON().slice(0,10));
    $("#todayDay").text(localStorage.getItem("todayDay"));
    $("#entryTime").text(localStorage.getItem("savedEntryTime"));
    $("#exitTime").text(localStorage.getItem("savedExitTime"));

    //this is the default text
    $("#locationText").text("Please turn on your GPS")

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        console.log("watch position called")

        distance = calculateDistance(jorvasPosLat, jorvasPosLong, position.coords.latitude, position.coords.longitude)
        console.log(position.coords.latitude + " " + position.coords.longitude)
        console.log(distance)

        if(distance < radialAllowance){
          $("#locationText").text("You are in Jorvas")
		      
          if(localStorage.getItem("lastInJorvas") == "no" || localStorage.getItem("lastInJorvas") == null){
            localStorage.setItem("savedEntryTime", getCurrentTime());
            $("#entryTime").text(localStorage.getItem("savedEntryTime"));
            localStorage.setItem("lastInJorvas", "yes");

            console.log("savedEntryTime set");
		      }
          console.log("IN Jorvas called " + localStorage.getItem("savedEntryTime"));

        } else {
          $("#locationText").text("You are not in Jorvas")
		      
          if(localStorage.getItem("lastInJorvas") == "yes" || localStorage.getItem("lastInJorvas") == null){
            localStorage.setItem("savedExitTime", getCurrentTime());
            $("#entryTime").text(localStorage.getItem("savedExitTime"));
            localStorage.setItem("lastInJorvas", "no");

            console.log("savedExitTime set");
		      }
          console.log("NOT IN Jorvas called " + localStorage.getItem("savedExitTime"))
        }
      });
    } else {
        $("#locationText").text("Please turn on your GPS")
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
   var now = new Date();
   return (now.toJSON().slice(11,16));
}
