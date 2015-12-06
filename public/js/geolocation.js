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
    var radialAllowance = 0.25;
    //var lastInJorvas =  null;
    //var savedEntryTime = null;
    //var savedExitTime = null;

    console.log("Today's date: " + moment().format('L'));

    $("#displayedDate").text("w" + moment().format("ww ddd, D MMM YYYY"));

    //if associatedDate is today, display values to user
    if(localStorage.getItem("associatedDate") == moment().format('L')){
      $("#entryTime").text(localStorage.getItem("savedEntryTime"));
      $("#exitTime").text(localStorage.getItem("savedExitTime"));  
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
          $("#locationText").text("You are in Jorvas")
        } else {
          $("#locationText").text("You are not in Jorvas") 
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
