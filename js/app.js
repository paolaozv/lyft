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
	if (codigoRandom == codigo) {
		$(this).attr("href", "signup2.html");
	} else if (codUno == 0) {
		alert("Ingrese su código por favor!");
	} else if (codigoRandom != codigo) {
		alert("Código Inválido!");
	}
};

var cargarPagina = function() {
	$("#numero").focus();
	$("#numero").keydown(deshabilitar);
	$("#numero").keyup(validacion);
	$("#siguiente").click(aleatorio);
	$(".num:first").focus();
	$("#numero-tel").text(numeroCel);
	$(".num").keydown(deshabilitarNum);
	$(".num").keyup(focus);
	$("#sigVerify").click(validacionCod);
};

var codigoRandom = localStorage.getItem("codigo");
var numeroCel = localStorage.getItem("numCelular");

$(document).ready(cargarPagina);