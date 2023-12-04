window.addEventListener("load", obtenerDatosLocalStorage);

function obtenerDatosLocalStorage() {
    // Obtener datos del localStorage
    const palabraSecreta = localStorage.getItem('palabraSecreta');
    mostrarPalabraSecreta(palabraSecreta);
};

function mostrarPalabraSecreta(palabraSecreta) {
    const palabraSecretaDIV = document.getElementById('palabraSecreta');

    //bucle que crea para cada letra de la palabra en un span
    for (let i = 0; i < palabraSecreta.length; i++) {
        let span = document.createElement("span");
        span.textContent = palabraSecreta[i];
        //aplicar estilos específicos dependiendo de la letra
        aplicarEstilos(span, i);
        //se añade al div de la palabra secreta los span
        palabraSecretaDIV.appendChild(span);
    }
}

//funcion para aplicar los estilos, tiene en cuenta el span y el numero de espan que es
function aplicarEstilos(span, indice) {
    // Definir la animation-delay según el numero de espan que
    const delay = indice * 0.2 + 's';
    //se le suma de delay 0.2s
    span.style.animationDelay = delay;
}