$(document).ready(function() {
	$('#nombre').val("");
	$('#boton').attr("disabled", false);
	$('#boton').click(function() {
		$('#popup').fadeIn('slow');
		$('.popup-overlay').fadeIn('slow');
		$('.popup-overlay').height($(window).height());
		$(this).attr("disabled", true);
		return false;
	});

	$('#close').click(function() {
		if ($('input:radio[name=nivel]:checked').val()) {
			$('#popup').fadeOut('slow');
			$('.popup-overlay').fadeOut('slow');

			$("#botonestadisticas").attr("disabled", true);

			comenzarJuego($('input:radio[name=nivel]:checked').val());
			$('img').click(function() {
				comprobarCarta($(this).attr('id'));
			});
		} else {
			alert("Selecciona un nivel de dificultad");
		}
		return false;
	});


	$('#estadisticas').click(function() {
		/*Obtener datos almacenados y Mostrar datos almacenados*/
		$('#popupesta').fadeIn('slow');
		$('.popupesta-overlay').fadeIn('slow');
		$('.popupesta-overlay').height($(window).height());
		$(this).attr("disabled", true);

		return false;
	});
});

var arrayPosiciones = [];
var arrayCartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var carta1;
var carta2;
var posicionCarta1;
var posicionCarta2;
var parejas;
var jugar;
var arrayPosicionesElegidas = [];
var contfallos = 0;
var contaciertos = 0;
var interval = 0;
var tiempo = 0;
var nombre = "";

function comenzarJuego(nivel) {
	if (!jugar) {
		jugar = true;
		parejas = 0;
		carta1 = -1; // Para que sean distintas de cualquier carta del juego
		carta2 = -2; // Para que sean distintas de cualquier carta del juego
		contfallos = 0;
		contaciertos = 0;
		arrayPosiciones = new Array(20); // Vaciar el array
		arrayPosicionesElegidas.length = 0; // Vaciar el array
		var imagen = "images/carta.jpg";

		// Bucle para añadir la imagen de carta tapada
		for (var i = 0; i < arrayPosiciones.length; i++) {
			$("#imagen" + i).attr("src", imagen);

		}
		$("#aciertos").text(contaciertos);
		$("#fallos").text(contfallos);
		$("#puntos").text(contaciertos * 100);
		asignarImagenes();
		contador_regresivo(nivel);
	} else {
		alert("Ya has comenzado a jugar");
	}
}

function numAleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para añadir las imagenes de los elementos
function asignarImagenes() {
	for (var i = 0; i < arrayCartas.length; i++) {
		comprobar = false;
		while (comprobar == false) {
			var posicion1 = numAleatorio(0, 19);
			var posicion2 = numAleatorio(0, 19);
			if (arrayPosiciones[posicion1] == undefined && arrayPosiciones[posicion2] == undefined && posicion1 != posicion2) {
				arrayPosiciones[posicion1] = arrayCartas[i];
				arrayPosiciones[posicion2] = arrayCartas[i];
				comprobar = true;
			}
		}
	}
}

// Funcion para comprobar si has seleccionado una carta ya seleccionada (parejas acertadas)
function comprobarCarta(numPosicion) {
	var comprobar = false;
	if (numPosicion.length == 7) {
		numPosicion = numPosicion.charAt(numPosicion.length - 1);
	}
	if (numPosicion.length == 8) {
		numPosicion = numPosicion.charAt(numPosicion.length - 2) + numPosicion.charAt(numPosicion.length - 1);
	}
	if (jugar == true) {
		for (var i = 0; i < arrayPosicionesElegidas.length; i++) {
			if (arrayPosicionesElegidas[i] == numPosicion) {
				i = arrayPosicionesElegidas.length;
				comprobar = true;
			}
		}
		if (comprobar) {
			// alert("Está carta ya ha sido seleccionada");
		} else {
			mostrarCarta(numPosicion);
		}
	} else {
		alert("Por favor, seleccione el botón de Comenzar a jugar");
	}
}

// Función para recoger las dos cartas seleccionadas y mostrarlas
function mostrarCarta(numPosicion) {

	if (numPosicion.length == 7) {
		numPosicion = numPosicion.charAt(numPosicion.length - 1);
	}
	if (numPosicion.length == 8) {
		numPosicion = numPosicion.charAt(numPosicion.length - 2) + numPosicion.charAt(numPosicion.length - 1);
	}

	var imagen;

	if (carta1 === -1) {
		carta1 = arrayPosiciones[numPosicion];
		imagen = "images/" + carta1 + ".jpg";
		$("#imagen" + numPosicion).attr("src", imagen);
		posicionCarta1 = numPosicion;
	} else if (carta2 === -2) {
		if (numPosicion == posicionCarta1) {
			//alert("Acabas de seleccionar esta carta, selecciona otra");
		} else {
			carta2 = arrayPosiciones[numPosicion];
			imagen = "images/" + carta2 + ".jpg";
			$("#imagen" + numPosicion).attr("src", imagen);
			posicionCarta2 = numPosicion;
			setTimeout(function() {
				compararCartas();
			}, 200);
		}
	} else {
		//alert("Ya has seleccionado dos cartas");
	}
}

// Función para comparar las dos cartas seleccionadas y comprobar si has conseguido todas las parejas
function compararCartas() {
	var imagen = "images/carta.jpg";
	if (carta1 === carta2) {
		parejas++;
		contaciertos++;
		arrayPosicionesElegidas.push(posicionCarta1);
		arrayPosicionesElegidas.push(posicionCarta2);
	} else {
		contfallos++;
		$("#imagen" + posicionCarta1).attr("src", imagen);
		$("#imagen" + posicionCarta2).attr("src", imagen);
	}
	carta1 = -1; // Para que sean distintas de cualquier carta del juego
	carta2 = -2; // Para que sean distintas de cualquier carta del juego
	$("#aciertos").text(contaciertos);
	$("#fallos").text(contfallos);
	$("#puntos").text(contaciertos * 100);

	if (parejas == 10) {
		clearInterval(interval);
		jugar = false;
		alert("HAS GANADO");
		terminar();
	}
}

function contador_regresivo(s) {
	interval = setInterval(function() {
		if (s > 0) {
			s--;
			tiempo = s;
		} else {
			clearInterval(interval);
			terminar();
			jugar = false;
			alert("El tiempo se ha agotado");

		}
		$("#tiempo").text(s + " s");
	}, 1000);
}

function calcularPuntos() {
	var puntuacion = Math.round((contaciertos * 100) + ((tiempo * 1000) / $('input:radio[name=nivel]:checked').val()));
	guardarbd(nombre, $("#puntos").text());
	$("#botonestadisticas").attr("disabled", false);
}

function terminar(){
	var puntuacion = Math.round((contaciertos * 100) + ((tiempo * 1000) / $('input:radio[name=nivel]:checked').val()));
	$("img").css("filter", "grayscale(100%)");
	/*$("#popup").html('<div class="alert alert-success alert-dismissable"><strong>¡Completado!</strong> Has completado todas lás parejas.Tienes <b><big>' + puntuacion + '</big></b> puntos.  <big>'+ estrellas() +'</big> </div>');
	$("#mensaje").html('<div class="alert alert-success alert-dismissable"><strong>¡Completado!</strong> Has completado todas lás parejas.Tienes <b><big>' + puntuacion + '</big></b> puntos.  <big>'+ estrellas() +'</big> </div>');
	*/var url = "indatos.php?puntos="+puntuacion;
	window.open(url, "", "width=400,height=500,top=300,left=450,menubar=0,toolbar=0,resizable=0");
}

function guardarbd(nombrejugador, puntosjugador) {
	jQuery.post("conexion.php", {
		name: nombrejugador,
		pwd: puntosjugador
	});
}

