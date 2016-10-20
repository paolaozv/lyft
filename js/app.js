var cargarPagina = function() {
	$("#numero").focus();
	$("#numero").keydown(deshabilitar);
	$("#numero").keyup(validacion);
	$("#siguiente").click(aleatorio);
	$(".num:first").focus();
	$("#numero-tel").text(numeroCel);
	$(".num").keydown(deshabilitarNum);
	$(".num").keyup(focus);
	$("#boton").click(nuevoAleatorio);
	$("#sigVerify").click(validacionCod);
	$("#sigMap").click(function() {
		if (validacionDatos()) {
			$(this).attr("href", "ubicacion.html");
			var nombre = $("#nombre").val();
			localStorage.setItem("nombrePerfil", nombre);
			dateJoin();
		} else {
			alert("Ingresa tus datos correctamente o acepta términos y condiciones!");
		}
	});
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	}
	$("#nombre-perfil").text(nombre);
	$("#contain").hide();
	$("#user-map").click(profile);
	$("#contain").click(hide);
	$("#nombre-usuario").text(nombre);
	$("#fecha").text(fecha);
	$("#cameraInput").change(capturar);
};

$(document).ready(cargarPagina);

var codigoRandom = localStorage.getItem("codigo");
var numeroCel = localStorage.getItem("numCelular");
var nombre = localStorage.getItem("nombrePerfil");
var fecha = localStorage.getItem("dateJoin");

var deshabilitar = function(evento) {
	var ascii = evento.keyCode;
	if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
		return true;
	} else {
		return false;
	}
};

var valTamanio = function(evento) {
	var longitud = $("#numero").val().length;
	if (longitud == 9) {
		return true;
	} else {
		return false;
	}
};

var validacion = function(evento) {
	if (valTamanio()) {
		$("#siguiente").attr("href", "verify.html");
		$(this).removeClass("alerta");
		localStorage.setItem("numCelular", $(this).val());
	} else {
		$("#siguiente").removeAttr("href");
		$(this).addClass("alerta");
	}
};

var aleatorio = function() {
	if (valTamanio()) {
		var random = Math.floor(Math.random()*900) + 99;
		alert("LAB - " + random);
		localStorage.setItem("codigo", random);
	}
};

var deshabilitarNum = function(evento) {
	var ascii = evento.keyCode;
	var longitud = $(this).val().length;
	if (ascii == 8 || (ascii >= 48 && ascii <= 57 && longitud == 0)) {
		return true;
	} else {
		return false;
	}
};

var focus = function(evento) {
	var ascii = evento.keyCode;
	var longitud = $(this).val().length;
	if (longitud == 1) {
        $(this).next().focus();
    }
    if (ascii == 8) {
    	$(this).prev().focus();
    }
};

var validacionCod = function() {
	var codigo = $(".num").eq(0).val() + $(".num").eq(1).val() + $(".num").eq(2).val();
	var codUno = $(".num").eq(0).val().length;
	if (codigo == codigoRandom) {
		$(this).attr("href", "signup2.html");
	} else if (codUno == 0) {
		alert("Ingrese su código por favor!");
	} else if (codigo != codigoRandom) {
		alert("Código Inválido!");
	}
};

var nuevoAleatorio = function(evento) {
	evento.preventDefault();
	var randomDos = Math.floor(Math.random()*900) + 99;
	alert("LAB - " + randomDos);
	localStorage.setItem("codigo", randomDos);
	codigoRandom = randomDos;
};

var validacionDatos = function() {
	var nombre = $("#nombre").val().trim().length;
	var apellido = $("#apellido").val().trim().length;
	var email = $("#email").val().trim().length;
	var correo = $("#email").val().trim();
	var regEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	if (nombre > 1 && nombre < 20 && apellido > 1 && apellido < 30 && email > 5 && email < 50 && regEx.test(correo) && $("#check").is(":checked")) {
		return true;
	} else {
		return false;
	}
};

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

var profile = function() {
	$("#contain").addClass("opacity");
	$("#contain").show("slow");
};

var hide = function() {
	$(this).hide("slow");
};

var dateJoin = function() {
	var meses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "December"];
	var f = new Date();
	var d = f.getMonth();
	var a = f.getFullYear();
	var fecha = meses[d] + " " + a;
	localStorage.setItem("dateJoin", fecha);
};

var subirFoto = function(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(evento) {
			var imageUrl = $("#image").attr("src", evento.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
};

$("#inputFile").change(function() {
	subirFoto(this);
});

var error = function(error) {
	console.log("Error:", error.name);
};

var capturar = function(event) {
       if(event.target.files.length == 1 && 
          event.target.files[0].type.indexOf("image/") == 0) {
           $("#image").attr("src",URL.createObjectURL(event.target.files[0]));
       }
   
	
};