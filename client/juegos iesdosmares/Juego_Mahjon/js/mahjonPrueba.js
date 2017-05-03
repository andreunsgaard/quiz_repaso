var imagenes = new Array(21);
var valor1 = 0;
var valor2 = 0;
var turno = 0;
var aciertos = 0;
var intentos = 0;
var tiempecillo;
//var intentosRestantes = 25;
var cuentaAtras = 45;
var puntuacion = 0;
var elegido = 0;

$(document).ready(function() {
	$("#jugar").click(function() {
		$("#iniciar").attr("style", "visibility: visible");
		$("#enlace").attr("style", "visibility: visible");
		$("#jugar").attr("style", "visibility: hidden");
		$("#formulario").attr("style", "visibility: hidden");
		$("#intro").attr("style", "visibility: hidden");
		CargaAleatorio();
		limpiar();
		niveles();
		cronometro();
	});
});

function niveles() {
	var nivel1 = document.getElementById("avanzado").checked;
	var nivel2 = document.getElementById("intermedio").checked;
	var nivel3 = document.getElementById("principiante").checked;
	if (nivel1 == true) {
		cuentaAtras = 40;
	}
	if (nivel2 == true) {
		cuentaAtras = 50;
	}
	if (nivel3 == true) {
		cuentaAtras = 60;
	}
	return cuentaAtras;
}

window.onload = function(){
	$("#capaResultado").attr("style", "visibility: hidden");
	$("#iniciar").attr("style", "visibility: hidden");
	$("#enlace").attr("style", "visibility: hidden");
	$("#monedilla").attr("style", "visibility: hidden");
	$("#contadorIntentos").attr("style", "visibility: hidden");
	$("#intro").attr("style", "visibility: visible");
	setInterval(blink, 1000);
	setInterval(textoParpadea, 1000);
	setInterval(flechaParpadeo, 1000);
}

function blink() {
$("#jugar").fadeTo(200, 0.1).fadeTo(200, 1.0);
}

function flechaParpadeo() {
$("#flechaEnlace").fadeTo(200, 0.1).fadeTo(200, 1.0);
}

function textoParpadea() {
$("#intro").fadeTo(200, 0.1).fadeTo(200, 1.0);
}

function cronometro(){
	//niveles();
	if(cuentaAtras == 0) {
		//alert("Se le ha acabado el tiempo");
		$("#iniciar").fadeTo("slow",0.3);
		//document.getElementById('iniciar').style.opacity = 0.3;
		$("#capaResultado").attr("style", "visibility: visible");
		marcador();
		//location.reload();
	}else{
		cuentaAtras -= 1;
		tiempecillo = setTimeout("cronometro()",1000);
		$("#cuentaAtras").html("Time" + "<br>" +cuentaAtras);
	}
	if(cuentaAtras <= 10){
		$("#cuentaAtras").css("color","red");	
	}
}

function marcador() {
	var nivel1 = document.getElementById("avanzado").checked;
	var nivel2 = document.getElementById("intermedio").checked;
	var nivel3 = document.getElementById("principiante").checked;
	if (nivel1 == true) {
		elegido = 40;
	}
	if (nivel2 == true) {
		elegido = 50;
	}
	if (nivel3 == true) {
		elegido = 60;
	}

	puntuacion = aciertos * 100;
	var segundos = parseInt(cuentaAtras) / parseInt(elegido);
	var segundosFinales = segundos * 1000;
	resultado = parseInt(puntuacion) + parseInt(segundosFinales);
	var url = "indatos.php?puntos="+resultado;

	if(resultado >= 0 && resultado <= 1000) {
		$("#score").html(resultado + " puntos");
		$("#estrella1").attr("style", "visibility: visible");
		$("#estrella2").attr("style", "visibility: hidden");
		$("#estrella3").attr("style", "visibility: hidden");
	}
	if(resultado >= 1000 && resultado < 1440) {
		$("#score").html(resultado + " puntos");
		$("#estrella1").attr("style", "visibility: visible");
		$("#estrella2").attr("style", "visibility: visible");
		$("#estrella3").attr("style", "visibility: hidden");
	}
	if(resultado >= 1300) {
		$("#score").html(resultado + " puntos");
		$("#estrella1").attr("style", "visibility: visible");
		$("#estrella2").attr("style", "visibility: visible");
		$("#estrella3").attr("style", "visibility: visible");
	}

	$("#enlace2").click(function() {
		window.open(url, "nuevo", "directories=no, location=no, menubar=no, top=180, left=450,scrollbars=yes, statusbar=no, tittlebar=no, width=400, height=480");
	});
}


// Cargará una de las imagenes de la subcarpeta entre el numero 1 y 10 y luego repetirá la operación
function CargaAleatorio() {
	var i = 0;
	var datos = "";
	for(i = 1;i <= 10;i++) {
		imagenes[i] = i+".png";
	}
	var k = 1;
	for(i = 11;i <= 20;i++) {
		imagenes[i] = k + ".png";
		k++;
	}
	var aux = "";

	// Intercambiar
	for(i = 1;i <= 20;i++) {
		var aleatorio = Math.floor(Math.random()*20)+1;
		aux = imagenes[i];
		imagenes[i] = imagenes[aleatorio];
		imagenes[aleatorio] = aux;
		document.getElementById(i + "a").src = "imagenes/"+imagenes[i];
	}
}

// Asegura que las cartas se darán la vuelta al inicio del juego
function limpiar() {
	for(i = 1;i <= 20;i++) {
		document.getElementById(i + "a").src = "imagenes/0.png";
	}
}

function clickar(valor) {
	var restante;
	// Comprobamos si esta deshabilidato y no se ha seleccionado nada
	// He tenido que usar "Atributtes" para la comprobación de clicks en una misma carta
	if((document.getElementById(valor+"a").getAttribute("disabled") == null) && ((valor1 == 0) || (valor2 == 0))){ 
		// Como no esta deshabilitado, quiere decir que es el primer click, por lo que lo deshabilitamos
		document.getElementById(valor+"a").setAttribute("disabled", 'disabled');
		if(turno == 0) { // Si es el primer turno
			valor1 = valor;
			turno = 1;
			document.getElementById(valor1+"a").src = "imagenes/"+imagenes[valor1];
		} else { // En el segundo turno si son diferentes enseña la carta medio segundo
			valor2 = valor;
			turno = 0;
			document.getElementById(valor2+"a").src = "imagenes/"+imagenes[valor2];
			$("#contadorIntentos").attr("style", "visibility: visible");
			
			if(imagenes[valor1] == imagenes[valor2]) {
				aciertos++;
				intentos++;
				//restante = parseInt(intentosRestantes) - parseInt(intentos);
				$("#monedilla").attr("style", "visibility: visible");
				$("#contadorIntentos").html(" X " + aciertos);
				valor1 = 0;
				valor2 = 0;
				//alert("iguales");
			} else {
				setTimeout(function(){
					intentos++;
					//restante = parseInt(intentosRestantes) - parseInt(intentos);
					$("#monedilla").attr("style", "visibility: visible");
					$("#contadorIntentos").html(" X " + aciertos);
					document.getElementById(valor1+"a").src = "imagenes/0.png"; 
					document.getElementById(valor2+"a").src = "imagenes/0.png";
					document.getElementById(valor1+"a").removeAttribute("disabled");
					document.getElementById(valor2+"a").removeAttribute("disabled");
					valor1 = 0;
					valor2 = 0;
				}, 400);
			}
		}
		if(aciertos == 10){
			clearInterval(tiempecillo);
			$("#contadores").attr("style", "visibility: hidden");
			$("#capaResultado").attr("style", "visibility: visible");
			marcador();

		}

		/*if(intentos == intentosRestantes){
			setTimeout(function(){
				alert("Se ha quedado sin intentos");
				location.reload();
			}, 100);

		}*/
	}
}

