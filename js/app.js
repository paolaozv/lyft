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
		var digitoUno = parseInt(codigo % 10);
		var digitoDos = parseInt((codigo / 10) % 10);
		var digitoTres = parseInt((codigo / 10) / 10);
		console.log(digitoUno);
		console.log(digitoDos);
		console.log(digitoTres);
		var array = [digitoUno, digitoDos, digitoTres];
	}
};

var cargarPagina = function() {
	$("#numero").keydown(deshabilitar);
	$("#numero").keyup(validacion);
	$("#siguiente").click(aleatorio);
};

$(document).ready(cargarPagina);