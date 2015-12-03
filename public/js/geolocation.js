/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
//console.log("geolocation called first");

$(document).ready(function() {
    console.log("geolocation called");
    
    var jorvasPosLat = 60.1302003;
    var jorvasPosLong = 24.51244;
    var distance;
    var radialAllowance = 1;
    var lastInJorvas = true;

    var now = new Date();
    $("#todayDay").text(now.toJSON().slice(0,10))

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {

        console.log("watch position called")

        distance = calculateDistance(jorvasPosLat, jorvasPosLong, position.coords.latitude, position.coords.longitude)
        console.log(position.coords.latitude + " " + position.coords.longitude)
        console.log(distance)

        if(distance < radialAllowance && !lastInJorvas ){
          $("#locationText").text("You are IN Jorvas")
          $("#entryTime").text(now.toJSON().slice(11,16))
          lastInJorvas = true;
          console.log("IN Jorvas called")
          
        } else if(distance > radialAllowance && lastInJorvas){
          $("#locationText").text("You are NOT IN Jorvas")
          $("#exitTime").text(now.toJSON().slice(11,16))
          lastInJorvas = false;
          console.log("NOT IN Jorvas called")
        } else {
		  $("#locationText").text("There is an error")
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
