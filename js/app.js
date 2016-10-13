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
		$("#siguiente").attr("href", "signup.html");
		$("#numero").removeClass("alerta");
	} else {
		$("#siguiente").removeAttr("href");
		$("#numero").addClass("alerta");
	}
};

var aleatorio = function() {
	if (valTamanio()) {
		var codigo = Math.floor(Math.random()*900) + 99;
		alert("LAB - " + codigo);
	}
};

var maxUno = function() {
	var longitud = $(".num").val().length;
	if (longitud == 1) {
        $(this).next().focus();
    }
};

var cargarPagina = function() {
	$("#numero").keydown(deshabilitar);
	$("#numero").keyup(validacion);
	$("#siguiente").click(aleatorio);
	$(".num").keydown(deshabilitar);
	$(".num").keyup(maxUno);
};

$(document).ready(cargarPagina);