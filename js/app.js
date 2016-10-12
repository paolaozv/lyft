$(document).ready(function() {
	$("#numero").keydown(function(evento) {
		var ascii = evento.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;
		}
	});

	$("#numero").keyup(function(evento) {
		var longitud = $(this).val().length;
		if (longitud == 9) {
			$("#siguiente").attr("href", "signup.html");
			$("#numero").removeClass("alerta");
		} else {
			$("#siguiente").removeAttr("href");
			$("#numero").addClass("alerta");
		}
	});
	
	$("#siguiente").click(function() {
		var longitud = $("#numero").val().length;
		if (longitud == 9) {
			var codigo = Math.floor(Math.random()*900) + 99;
			alert(codigo);
		}
	});
});