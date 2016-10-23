var cargarMapa = function() {
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
    $("#go-to").click(travelToAddress);
};

$(document).ready(cargarMapa);

var map;
var latLon;
var directionsRenderer;
var directionsService;
var mapa = document.getElementById("mapa");
var desLatlon;

var funcionExito = function(position) {
    showMap(position.coords.latitude, position.coords.longitude);
};

var funcionError = function(error) {
    console.log(error);
};

var showMap = function(lat, lon) {
    latLon = new google.maps.LatLng(lat, lon);
    var myOptions = {
        zoom: 13,
        center: latLon,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    map = new google.maps.Map(mapa, myOptions);

    var marker = new google.maps.Marker({
        position: latLon,
        title: "You are here!",
    });

    var direccion = "";

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({"latLng": latLon}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                direccion =  results[0].formatted_address ;
            } else {
                direccion = "No se puede mostrar la dirección";
            }
        }

        $("#direction").val(direccion);
    });

    marker.setMap(map);

    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
};

var travelToAddress = function() {
    var destino = document.getElementById("destiny").value;
    directionsService = new google.maps.DirectionsService();

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { "address": destino}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var  longitude = results[0].geometry.location.lng();
            desLatlon =new google.maps.LatLng(latitude, longitude);
        } 
    });

    var request = {
        origin: latLon,
        destination: destino,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request,getRuta);
};

var getRuta = function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
    } else {
        alert("Ha ocurrido un error");
    }
    $("#destiny").val("");
    $("#show-destiny").hide();
    distancia();
};

var distancia = function() {
    var distancia = ((google.maps.geometry.spherical.computeDistanceBetween(latLon, desLatlon))/1000).toFixed(2);
    var costo = (2.17*distancia).toFixed(2);
    alert("The approximate distance is " + distancia + "km" + "\n"
        + "The approximate cost is $. " + costo);
};