var cargarMapa = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	}
    $("#go-to").click(irDestino);
};

$(document).ready(cargarMapa);

var funcionExito = function(posicion) {
	var lat = posicion.coords.latitude;
	var lon = posicion.coords.longitude;
	var latlon = new google.maps.LatLng(lat, lon);
	var mapa = document.getElementById("mapa");

	var myOptions = {
	    center : latlon, zoom: 14,
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

var irDestino = function() {
    var direccion = $("#destiny").val();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ "address": direccion} , destino);
};

var destino = function(result, status){
    if (status == "OK"){
        var mapOptions = {
            center: result[0].geometry.location,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
        map.fitBounds(result[0].geometry.viewport);

        var markerOptions = { position: result[0].geometry.location }
        var marker = new google.maps.Marker(markerOptions);
        marker.setMap(map);

    } else {
        alert("No existe dirección!")
    }

    $("#destiny").val("") ;
    $("#show-destiny").hide();
};

/*var calcularRuta = function() {
    var start = document.getElementById("direction").value;
    var end = document.getElementById("destiny").value;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, ruta);
};

var ruta = function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
    }
};*/