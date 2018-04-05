location_access = false;
location_message = "";
lat  = null;
long = null;

function requestLocationAccess() {
 	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getLocationPosition, locationError);
	} else {
		location_message = "Geolocation is not supported by this browser.";
    	}
}

function getLocationPosition(position) {
	localStorage.setItem("authorizedGeoLocation", 1);
	location_access = true;
	lat = position.coords.latitude;
	long= position.coords.longitude;
	location_message = "Latitude: " + lat + " | Longitude: " + long;
	locationAccessEvent();
}

function locationError(error) {
	localStorage.removeItem("authorizedGeoLocation");
	switch(error.code) {
		case error.PERMISSION_DENIED:
			location_message = "Request for Geolocation denied."
			break;
		case error.POSITION_UNAVAILABLE:
			location_message = "Location information is unavailable."
			break;
		case error.TIMEOUT:
			location_message = "The request to get user location timed out."
			break;
		case error.UNKNOWN_ERROR:
			location_message = "An unknown error occurred."
			break;
	}
	locationAccessEvent();
}
