var arrayPosiciones = [];
var arrayCartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var carta1;
var carta2;
var posicionCarta1;
var posicionCarta2;
var parejas;
var jugar;
var arrayPosicionesElegidas = [];
var contador;
var puntos=0;
var contadorf=0;
var contadorini;
$(document).ready(function(){
  $(".puntuacion").hide();
  $(".mostrar").hide();
  $(".reiniciar").hide();
  $("#formu").hide();


	});

function comenzarJuego() {
	if (!jugar) {
		jugar = true;
		parejas = 0;
		carta1 = -1; // Para que sean distintas de cualquier carta del juego
		carta2 = -2; // Para que sean distintas de cualquier carta del juego
		arrayPosiciones = new Array (20); // Vaciar el array
		arrayPosicionesElegidas.length = 0; // Vaciar el array
		var imagen = "images/carta.jpg";
		// Bucle para añadir la imagen de carta tapada
		for (var i = 0; i < arrayPosiciones.length; i ++) {
			document.getElementById("imagen" + i).src = imagen;
		}

		asignarImagenes();
    // Una vez le damos a  jugar y se hayan asignado las imagenes , mostramos el talbero con ellas y
    // ocultamos la parte superior del "menu" ;
		$(".mostrar").show(1000);
		$("p").hide(1000);
		$("fieldset").hide(1000);
  		contador = $('input[name="dificultad"]:checked').val();
  		contadorini=contador;
		setInterval(function(){
			contador--;

      //Cambio de colores en el contador segun se va acercando la cuenta a 0 y una vez se acaba el tiempo llamamos
      // a la funcion establecer puntos.
			if(contador<=60){
			$("#contador").html("<h2 style='color:green;'>"+contador+"</h2>");
		}

		if(contador<=30){
			$("#contador").html("<h2 style='color:orange;'>"+contador+"</h2>");
		}
		if(contador<=10){
			$("#contador").html("<h2 style='color:red;'>"+contador+"</h2>");
		}

			if(contador==0){
				$("#contador").hide();
				$(".mostrar").hide();
				establecerpuntos();
			}
		}, 1000);
	}
}

function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Función para añadir las imagenes de los elementos
function asignarImagenes() {
	for (var i = 0; i < arrayCartas.length; i ++) {
		comprobar = false;
		while(comprobar == false) {
			var posicion1 = numAleatorio(0,19);
			var posicion2 = numAleatorio(0,19);
		 if(arrayPosiciones[posicion1] == undefined && arrayPosiciones[posicion2] == undefined && posicion1 != posicion2) {
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
	if (jugar == true) {
		for (var i = 0; i < arrayPosicionesElegidas.length; i++) {
			if (arrayPosicionesElegidas[i] == numPosicion) {
				i = arrayPosicionesElegidas.length;
				comprobar = true;
			}
		}
		if (comprobar) {
			//alert("Está carta ya ha sido seleccionada");
		}
		else {
			mostrarCarta(numPosicion);
		}
	}
}

// Función para recoger las dos cartas seleccionadas y mostrarlas
function mostrarCarta(numPosicion) {
	var imagen;

	if (carta1 === -1) {
		carta1 = arrayPosiciones[numPosicion];
		imagen = "images/" + carta1 + ".jpg";
		document.getElementById("imagen" + numPosicion).src = imagen;
		posicionCarta1 = numPosicion;
	}
	else if (carta2 === -2) {
		if (numPosicion == posicionCarta1) {
		} else {
			carta2 = arrayPosiciones[numPosicion];
			imagen = "images/" + carta2 + ".jpg";
			document.getElementById("imagen" + numPosicion).src = imagen;
			posicionCarta2 = numPosicion;
			setTimeout(function(){ compararCartas(); }, 300);
		}
	}
}

// Función para comparar las dos cartas seleccionadas y comprobar si has conseguido todas las parejas
function compararCartas() {
	var imagen = "images/carta.jpg";
	if (carta1 === carta2) {
		parejas ++;
		arrayPosicionesElegidas.push(posicionCarta1);
		arrayPosicionesElegidas.push(posicionCarta2);
		puntos=puntos+100;	} else {
		document.getElementById("imagen" + posicionCarta1).src = imagen;
		document.getElementById("imagen" + posicionCarta2).src = imagen;
	}
	carta1 = -1; // Para que sean distintas de cualquier carta del juego
	carta2 = -2; // Para que sean distintas de cualquier carta del juego

	if(parejas == 10) {
		contadorf=contador;
		$("#contador").hide(1000);
		$(".mostrar").hide(1000);
		establecerpuntos();
	}
}
// Logica de la asignacion de puntos / asignacion de rango dependiendo de la puntuacion conseguida
function establecerpuntos(){
	var puntosparejas=puntos;
	puntos=1000*(contadorf/contadorini);
	puntos=puntos+puntosparejas;


	puntos=Math.round(puntos);
	contador=0;
		$(".puntuacion").html("<h1>Puntuacion: "+puntos+"</h1>");
		$("#puntos").val(puntos);



		if(puntos>1499){
			$(".rango").html("<img src='images/challenger.png' draggable='false' /><p>¡Challenger!</p>");
		}else if(puntos <= 1499 &&  puntos >= 1300){
			$(".rango").html("<img src='images/master.png' draggable='false' /><p>¡Master!</p>");
		}else if(puntos <1300 && puntos >= 1199){
			$(".rango").html("<img src='images/diamond.png' draggable='false' /><p>¡Diamond!</p>");
		}else if(puntos <1199 && puntos >= 1000){
			$(".rango").html("<img src='images/platinum.png' draggable='false' /><p>¡Platinum!</p>");
		}else if(puntos <1000 && puntos >= 800){
			$(".rango").html("<img src='images/gold.png' draggable='false' /><p>¡Gold!</p>");
		}else{
			$(".rango").html("<img src='images/silver.png' draggable='false' /><p>¡Silver!</p>");
		}

	
		$(".puntuacion").show(1000);
		$(".reiniciar").show(1000);
	
	      $("#formu").show(1000);

}

function reiniciar(){
	location.reload();
}
