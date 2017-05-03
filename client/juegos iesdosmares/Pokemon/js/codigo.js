var segundos;		//Para el tiempo atras
var nivel=0;		//Nivel de dificultad
var cronometro;		//Para función cronometro 
var activado=false;  //si esta ya jugando
var terminado=false; //si ha terminado el tiempo
var puntuacion=0;	// Puntuación del juego
var tablero = [];
var acertadas = ["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-"];
var primera;		//primera pulsacion
var segunda;		//segunda pulsacion
var pulsaPareja=0;	//contador de pulsaciones
var parejas=0;		//contador de parejas

//función de cálculo aleatorio entre un max. y un min.
function getRndInteger(min, max) {					
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generaTablero(){				//Generamos el tablero, para ello vamos buscando numeros aleatorios de [0-9], miramos si estan repetidos, si no es así, los introducimos al array tablero.
	var numero;							//En el caso de que lo este, si solo aparece una vez, lo introducimos también, pero, ya no podrá acceptarlo ese número más. Esto se repite hasta 
	var posicion =0;					//hacer un array con un total de 20 elementos.
	var repite = 0;
	while(posicion<20){
		numero = getRndInteger(0, 9);
		for(var i=0; i<tablero.length ; i++){
			if(numero === tablero[i]){
				repite++;
			}
		}
		if(repite < 2){
			tablero.push(numero);
			posicion++;
		}
		repite = 0;
	}
}

/*Para recoger el nivel y devolver el tiempo*/
function miranivel(array){
	for(var i = 0; i < array.length ; i++){
		if(array[i].checked){
			nivel = array[i].value
		}
	}
	switch(nivel){
		case '0':{
			return 0;
			break;
		}
		case '1':{
			return 40;
			break;
		}
		case '2':{
			return 50;
			break;
		}
		case '3':{
			return 60;
			break;
		}
	}
}

/*Función para calcular y pintar estrellas*/
function estrellas(){
	var cadena="";
	var cantidad;
	if(puntuacion<400){
		cantidad=0;
	}else if(puntuacion<800){
		cantidad=1;
	}else if(puntuacion<1200){
		cantidad=2;
	}else if(puntuacion<1600){
		cantidad=3;
	}else if(puntuacion<2000){
		cantidad=4;
	}else{
		cantidad=5;
	}
	for(var i=0;i<=cantidad;i++){
		cadena+= '<i class="fa fa-star" aria-hidden="true"></i> ';		
	}
	return cadena;
}

/*Función para calcular puntuación*/
function calcula_puntuacion(){
	switch(nivel){
		case '1':{
			puntuacion = Math.floor((parejas*100)+((1000*segundos)/40))+25;
			break;
		}
		case '2':{
			puntuacion = Math.floor((parejas*100)+((1000*segundos)/50))+20;
			break;
		}
		case '3':{
			puntuacion = Math.floor((parejas*100)+((1000*segundos)/60))+17;
			break;
		}
	}
	if(puntuacion<0){
		puntuacion=0;
	}
}

//función para terminar el juego, muestra mensaje y popup con puntuación y llama a la nueva ventana de registro.
function terminar(){
	$("img").css("filter", "grayscale(100%)");
	$("#popup").html('<div class="alert alert-success alert-dismissable"><strong>¡Completado!</strong> Has completado todas lás parejas.Tienes <b><big>' + puntuacion + '</big></b> puntos.  <big>'+ estrellas() +'</big> </div>');
	$("#mensaje").html('<div class="alert alert-success alert-dismissable"><strong>¡Completado!</strong> Has completado todas lás parejas.Tienes <b><big>' + puntuacion + '</big></b> puntos.  <big>'+ estrellas() +'</big> </div>');
	var url = "indatos.php?puntos="+puntuacion;
	window.open(url, "", "width=400,height=500,top=300,left=450,menubar=0,toolbar=0,resizable=0");
}

/*Función conometro*/
function cronos(){
	$("#tiempo").css("background-color","green");
	if(segundos<=20){
		$("#tiempo").css("background-color","yellow");
		$("img").css("border-color","yellow");
		$("#mensaje").html('<div class="alert alert-success alert-dismissable mensa text-center"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>¡Rápido!</strong> Date prisa que queda poco tiempo.</div>');
	}
	if(segundos<=10){
		$("img").css("border-color","red");
		$("#tiempo").css("background-color","red");
		$("#mensaje").html('<div class="alert alert-danger alert-dismissable fade in mensa text-center"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>¡Alerta!</strong> Vamós date prisa, el tiempo se agota.</div>');
	}
	if((segundos >= 0) && !terminado){
		$("#tiempo").text(segundos + '"');
		segundos--;
		calcula_puntuacion();
	}else{
		terminado=true;
		clearInterval(cronometro);
		calcula_puntuacion();
		terminar();
		
	}
}

/*función que mira las acertadas para que no haga hover sobre las acertadas*/
function mira_acertada(posicion){
	if(acertadas[posicion] === "-"){
		return false;
	}else{
		return true;
	}
}

/*Función para según se pulse, con el id, se devuelve su posición en tablero*/
function posicion_tablero(cadena){
	switch(cadena){
		case "img0":{
			return 0;
			break;
		}
		case "img1":{
			return 1;
			break;
		}
		case "img2":{
			return 2;
			break;
		}
		case "img3":{
			return 3;
			break;
		}
		case "img4":{
			return 4;
			break;
		}
		case "img5":{
			return 5;
			break;
		}
		case "img6":{
			return 6;
			break;
		}
		case "img7":{
			return 7;
			break;
		}
		case "img8":{
			return 8;
			break;
		}
		case "img9":{
			return 9;
			break;
		}
		case "img10":{
			return 10;
			break;
		}
		case "img11":{
			return 11;
			break;
		}
		case "img12":{
			return 12;
			break;
		}
		case "img13":{
			return 13;
			break;
		}
		case "img14":{
			return 14;
			break;
		}
		case "img15":{
			return 15;
			break;
		}
		case "img16":{
			return 16;
			break;
		}
		case "img17":{
			return 17;
			break;
		}
		case "img18":{
			return 18;
			break;
		}
		case "img19":{
			return 19;
			break;
		}
	}
}

/*función para decir que carta es segun el número del tablero*/
function dime_carta(numero){
	switch(numero){
		case 0:{
			return 'images/imagen0.jpg';
			break;
		}
		case 1:{
			return 'images/imagen1.jpg';
			break;
		}
		case 2:{
			return 'images/imagen2.jpg';
			break;
		}
		case 3:{
			return 'images/imagen3.jpg';
			break;
		}
		case 4:{
			return 'images/imagen4.jpg';
			break;
		}
		case 5:{
			return 'images/imagen5.jpg';
			break;
		}
		case 6:{
			return 'images/imagen6.jpg';
			break;
		}
		case 7:{
			return 'images/imagen7.jpg';
			break;
		}
		case 8:{
			return 'images/imagen8.jpg';
			break;
		}
		case 9:{
			return 'images/imagen9.jpg';
			break;
		}
	}
}

// Comprueba el fin del juego en acertadas
function comprueba_fin(){
	var cuenta=0;
	for(var i=0; i<acertadas.length;i++){
		if(acertadas[i]==="-"){
			cuenta++;
		}
	}
	if(cuenta!=0){
		return false;
	}else{
		return true;
	}
}

// Voltea las cartas nuevamente si no haciertas
function restaura_cartas(){
	$("#img"+primera).attr('src','images/trasera.jpg');
	$("#img"+segunda).attr('src','images/trasera.jpg');
	noclick=false;
}

//Comprueba si las cartas son iguales
function compruebaIguales(primero,segundo){			
	if(tablero[primero] === tablero[segundo]){	
		acertadas[primero]=tablero[primero];
		acertadas[segundo]=tablero[segundo];
		return true;
	}else{
		return false;
	}
}

//función que mira si esa posición esta libre, si es la primera carta la guarda, si es la segunda, mira si ambas son iguales, si ha terminado el juego,
//muestra mensajes, para advertir al usuario de si no son iguales, si son iguales o pulsas en la misma.
function jugada(numero){	
	if(tablero[numero] !== "-"){
		pulsaPareja++;			
		if(pulsaPareja === 1){
			primera=numero;
		}
		if(pulsaPareja === 2){
			segunda = numero;
			if(primera !== segunda){
				if(compruebaIguales(primera,segunda)){
					$("#mensaje").html('<div class="alert alert-info alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>¡Bien!</strong> Has encontrado a la pareja.</div>');
					parejas++;
					if(comprueba_fin()){
						calcula_puntuacion();
						terminado=true;
						activado=false;
						terminar();
						clearInterval(cronometro);
					}
					pulsaPareja=0;
				}else{
					$("#mensaje").html('<div class="alert alert-success alert-dismissable mensa text-center"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>¡Ojo!</strong> Las parejas deben ser iguales</div>');
					pulsaPareja=0;
					setTimeout(restaura_cartas,300);
				}
			}else{
				pulsaPareja=0;
				setTimeout(restaura_cartas,300);
				$("#mensaje").html('<div class="alert alert-danger alert-dismissable fade in mensa text-center"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>¡Alerta!</strong> No vale pulsar sobre la misma carta.</div>');
			}
		}
	}else{
		$("#mensaje").html('<div class="alert alert-danger alert-dismissable fade in mensa text-center"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>¡Alerta!</strong> Pulsa en una que no este acertada.</div>');
	}	
 }

$(document).ready(function(){
	generaTablero();
	/*Al hacer un hover sobre el boton inicio*/
	$("#inicio").hover(function(evento){
		if((!activado) && (!terminado)){
			$(this).css("opacity", "0.5");
		}
		},function(){
			$(this).css("opacity", "1");
	});
	/*Al hacer un hover sobre cualquier carta*/
	$("img").hover(function(evento){
		var numero = posicion_tablero(this.id);
		if((activado) && (!terminado) && (!mira_acertada(numero))){
			$(this).css("opacity", "0.7");
		}
		},function(){
			$(this).css("opacity", "1");
	});

	/*Al pulsar el boton inicio*/
    $("#inicio").on("click",function(){
    	if((!activado) && (!terminado)){
    		var array = $(".nivel");
    		segundos = miranivel(array);
    		if(segundos === 0){
    			$("#mensaje").html('<div class="alert alert-danger alert-dismissable fade in mensa text-center"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>¡Error!</strong> No has seleccionado.</div>');
    		}else{
    			for(var i=0; i<array.length;i++){
    				array[i].disabled=true;	
    			}
    			$(this).css("background-color","green");
    			activado=true;
    			cronometro = setInterval(cronos,1000);
    		}
    	}else{
    		if(!terminado){
				$("#mensaje").html('<div class="alert alert-danger alert-dismissable fade in mensa text-center"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>¡Atento!</strong> No pulses más, ya estas jugando.</div>');    			
    		}    		
    	}
    })

    /*Al pulsar sobre las cartas*/
    $("img").on("click",function(){
    	var numero = posicion_tablero(this.id);
    	if((activado) && (!terminado) && (!mira_acertada(numero))){
    		$("#mensaje").html("");
    		$(this).attr('src',dime_carta(tablero[numero]));
    		jugada(numero);   		  		
    	}    	
    });
    
});