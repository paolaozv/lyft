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
			var apellido = $("#apellido").val();
			localStorage.setItem("apellidoPerfil", apellido);
			var email = $("#email").val();
			localStorage.setItem("emailPerfil", email);
			dateJoin();
		} else {
			alert("Enter your data correctly or accept terms and conditions!");
		}
	});
	$("#direction").focus();
	$("#nombre-perfil").text(nombre);
	$("#contain").hide();
	$("#user-map").click(profile);
	$("#contain").click(hide);
	$("#nombre-usuario").text(nombre);
	$("#fecha").text(fecha);
	$("#cameraInput").change(capturar);
	$("#destino").click(apareceDestino);
	$("#name-prof").val(nombre);
	$("#last-prof").val(apellido);
	$("#email-prof").val(email);
	if (image != null) {
		$("#image-map").attr("src", image);
		$("#image").attr("src", image);
		$("#image-prof").attr("src", image);
	}
};

$(document).ready(cargarPagina);

var codigoRandom = localStorage.getItem("codigo");
var numeroCel = localStorage.getItem("numCelular");
var nombre = localStorage.getItem("nombrePerfil");
var apellido = localStorage.getItem("apellidoPerfil");
var email = localStorage.getItem("emailPerfil");
var fecha = localStorage.getItem("dateJoin");
var image = localStorage.getItem("fotoAlmacenada");

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
		alert("Enter your code please!");
	} else if (codigo != codigoRandom) {
		alert("Invalid code!");
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
	var regEx = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	if (nombre > 1 && nombre < 20 && apellido > 1 && apellido < 30 && email > 5 && email < 50 && regEx.test(correo) && $("#check").is(":checked")) {
		return true;
	} else {
		return false;
	}
};

var profile = function() {
	$("#contain").addClass("opacity");
	$("#contain").show("slow");
};

var hide = function() {
	$(this).hide("slow");
};

var dateJoin = function() {
	var meses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var f = new Date();
	var d = f.getMonth();
	var a = f.getFullYear();
	var fecha = meses[d] + " " + a;
	localStorage.setItem("dateJoin", fecha);
};

var capturar = function(event) {
    if(event.target.files && event.target.files[0]){
		var reader = new FileReader();

		reader.onload = function(event){
			var recuperar = event.target.result;
			$("#image-prof").attr("src", recuperar);
			localStorage.setItem("fotoAlmacenada", recuperar);
		}
		reader.readAsDataURL(event.target.files[0]);
	}	
};

var apareceDestino = function() {
	$("#show-destiny").show();
	$("#destiny").focus();
};