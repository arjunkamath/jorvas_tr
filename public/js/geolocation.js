/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
console.log("geolocation called first");

$(document).ready(function() {
    console.log("geolocation called");
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            //drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

            var latLongResponse = 'Lat: ' + pos.coords.latitude + ' Long: ' + pos.coords.longitude;  // build string containing lat/long
            $("#latLongText").text(latLongResponse);
            console.log(latLongResponse);

            //var gotTextAddress = getAddress(pos.coords.latitude, pos.coords.longitude);
        }
        function fail(error) {
            //drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        //drawMap(defaultLatLng);  // No geolocation support, show default map
    }
});
