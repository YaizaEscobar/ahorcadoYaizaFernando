window.addEventListener("load", obtenerDatosLocalStorage);
window.addEventListener('load', dibujarPodio);

//funcion que obtiene los datos del localStorage
function obtenerDatosLocalStorage() {
    // Obtener datos del localStorage
    const ganador = localStorage.getItem('ganador');
    const segundo = localStorage.getItem('segundoPuesto');
    const puntosGanador = localStorage.getItem('puntuacionGanador');
    const puntosSegundo = localStorage.getItem('puntuacionSegundo');
    const ultimoSegundo = localStorage.getItem('ultimoSegundo');
    mostrarGanador(ganador);

    document.getElementById("nombreGanador").textContent = ganador;
    document.getElementById("nombreSegundo").textContent = segundo;
    document.getElementById("puntosGanador").textContent = "Puntos: " + puntosGanador;
    document.getElementById("puntosSegundo").textContent = "Puntos: " + puntosSegundo;
    document.getElementById("segundos").textContent = "Duración de la partida: " + ultimoSegundo;
};

function mostrarGanador(ganador) {
    const ganadorDIV = document.getElementById('ganador');

    //bucle que crea para cada letra de la palabra en un span
    for (let i = 0; i < ganador.length; i++) {
        let span = document.createElement("span");
        span.textContent = ganador[i];
        //aplicar estilos específicos dependiendo de la letra
        aplicarEstilos(span, i);
        //se añade al div de la palabra secreta los span
        ganadorDIV.appendChild(span);
    }
}

//funcion para aplicar los estilos, tiene en cuenta el span y el numero de espan que es
function aplicarEstilos(span, indice) {
    // Definir la animation-delay según el numero de espan que
    const delay = indice * 0.2 + 's';
    //se le suma de delay 0.2s
    span.style.animationDelay = delay;
}

//funcion que dibuja el podio 
function dibujarPodio() {
    //coje el elemento canvas para dibujar en el
    const canvas = document.getElementById('podioCanvas');
    //contexto de canvas para dibujar en el lienzo
    const lienzo = canvas.getContext('2d');

    // Dibujar podio 
    //rectangulo 1º puesto
    //fillStyle --> Establece el color de relleno para las formas que se dibujan en el lienzo a continuacion
    lienzo.fillStyle = '#FFD700';
    //fillRect(x, y, width, height): Dibuja un rectángulo lleno en el lienzo.
    //x (coordenadas horizontales)
    //y (coordenadas verticales)
    lienzo.fillRect(0, 93.75, 125, 136.25);

    //añadir el nombre del ganador encima del rectángulo amarillo
    lienzo.fillStyle = '#000000';
    lienzo.font = '18px Arial';
    //texto y posicion
    lienzo.fillText(document.getElementById("nombreGanador").textContent, 10, 75);

    //rectangulo 2º puesto
    lienzo.fillStyle = '#C0C0C0';
    lienzo.fillRect(125, 125, 125, 105);

    //rectangulo base podium
    lienzo.fillStyle = '#4ab64a';
    lienzo.fillRect(0, 230, 250, 20);

    //añadir el nombre del perdedor encima del rectángulo plata
    lienzo.fillStyle = '#000000';
    lienzo.font = '18px Arial';
    //texto y posición
    lienzo.fillText(document.getElementById("nombreSegundo").textContent, 135, 115);

    //añadir un icono dentro del primer rectángulo
    const icono_oro = new Image();
    icono_oro.src = 'img/oro.ico'; //ruta icono
    icono_oro.onload = function () {
        //dibuja el icono después de cargar (nombre imagen, coordenadas)
        lienzo.drawImage(icono_oro, 0, 93.75, 125, 136.25);
    };

    //añadir un icono dentro del segundo rectángulo
    const icono_plata = new Image();
    icono_plata.src = 'img/plata.ico'; //ruta icono
    icono_plata.onload = function () {
        //dibuja el icono después de cargar (nombre imagen, coordenadas)
        lienzo.drawImage(icono_plata, 125, 125, 125, 105);
    };
}