var cargarMapa = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	}	
};

$(document).ready(cargarMapa);

var funcionExito = function(posicion) {
	var lat = posicion.coords.latitude;
	var lon = posicion.coords.longitude;
	var latlon = new google.maps.LatLng(lat, lon);
	var mapa = document.getElementById("mapa");

	var myOptions = {
	    center : latlon, zoom:14,
	    mapTypeId : google.maps.MapTypeId.ROADMAP,
	    mapTypeControl : false,
	    zoomControl : false,
	    streetViewControl : false
    };
    
    var map = new google.maps.Map(document.getElementById("mapa"), myOptions);

    var marker = new google.maps.Marker({
    	position : latlon,
    	map : map,
    	title : "You are here!"
    });

    var direccion = "";

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({"latLng": latlon}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                direccion =  results[0].formatted_address ;
            } else {
                direccion = "No se puede mostrar la dirección";
            }
        }

    $("#direction").val(direccion);
    });
};

var funcionError = function(error) {
	console.log(error);
};