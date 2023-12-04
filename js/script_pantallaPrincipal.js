window.addEventListener("load", obtenerDatosLocalStorage);
window.addEventListener("load", inicializarJuego);

function obtenerDatosLocalStorage() {
    //obtener datos del localStorage
    const nombreJug1 = localStorage.getItem('nombreJug1');
    const avatarJug1 = localStorage.getItem('avatarJug1');
    const nombreJug2 = localStorage.getItem('nombreJug2');
    const avatarJug2 = localStorage.getItem('avatarJug2');
    const categoria = localStorage.getItem('categoriaSeleccionada');
    const nivel = localStorage.getItem('nivelSeleccionado');

    //actualizar la interfaz con los datos del localStorage
    document.getElementById('nombreJ1').textContent = nombreJug1;
    document.getElementById('avatarJ1').innerHTML = `<img src="${avatarJug1}" width="50px">`;
    document.getElementById('nombreJ2').textContent = nombreJug2;
    document.getElementById('avatarJ2').innerHTML = `<img src="${avatarJug2}" width="50px">`;
    document.getElementById('categoria').textContent = categoria;
    document.getElementById('nivel').textContent = nivel;
}

//arrays de películas
const peliculas1 = ['tesis', 'rec', 'divergente', 'torrente', 'interstellar'];
const peliculas2 = ['secuestrados', 'gladiator', 'et', 'shrek', 'oppenheimer'];
const peliculas3 = ['gran turismo', 'el exorcista', 'la purga', 'la sirenita', 'agente stone'];

//arrays de canciones
const canciones1 = ['despacito', 'bailando', 'sofia', 'zapatillas', 'volvera'];
const canciones2 = ['holanda', 'reina', 'columbia', 'amanece', 'modelito'];
const canciones3 = ['bailando bachata', 'rayos de sol', 'madrid city', 'peter pan', 'la promesa'];

//arrays de informatica
const informatica1 = ["javascript", "python", "java", "php", "ruby"];
const informatica2 = ["algoritmo", "framework", "api", "ciberseguridad", "hacker"];
const informatica3 = ["machine learning", "base de datos", "desarrollo web", "full stack", "laravel"];

let letrasIncorrectas = [];
let letrasDesocultas = 0;
let palabraSecreta;
let palabraMostrada;
let intentosRestantes;
let jugadorActual;
let puntosJug1;
let puntosJug2;
let juegoTerminado = false;
let adivinado = false;


//función para inicializar el juego y que se muestre la palabra
function inicializarJuego() {
    //deshabilitar botones
    document.getElementById("nuevaPartida").disabled = false;
    document.getElementById("resolverBoton").disabled = false;
    const botonesTeclado = document.querySelectorAll('.tecla');
    botonesTeclado.forEach(boton => {
        boton.disabled = false;
    });
    //la imagen se reinicia a la imagen principal 
    document.getElementById("imagen").src = "img/img0.png";
    //se restablece el array de letras incorrectas
    letrasIncorrectas.length = 0;
    //se coge del local storage la categoria y nivel guardados del formulario.
    const categoria = document.getElementById("categoria").textContent;
    const nivel = document.getElementById("nivel").textContent;
    //mostrar la palabra aleatoria según la categoría y el nivel elegidos en el formulario
    if (categoria === "Informática") {
        //dependiendo del nivel, seleccionar el array correspondiente
        if (nivel === "fácil") {
            palabraSecreta = informatica1[Math.floor(Math.random() * informatica1.length)];
        } else if (nivel === "intermedio") {
            palabraSecreta = informatica2[Math.floor(Math.random() * informatica2.length)];
        } else if (nivel === "difícil") {
            palabraSecreta = informatica3[Math.floor(Math.random() * informatica3.length)];
        }
    } else if (categoria === "Películas") {
        //dependiendo del nivel, seleccionar el array correspondiente
        if (nivel === "fácil") {
            palabraSecreta = peliculas1[Math.floor(Math.random() * peliculas1.length)];
        } else if (nivel === "intermedio") {
            palabraSecreta = peliculas2[Math.floor(Math.random() * peliculas2.length)];
        } else if (nivel === "difícil") {
            palabraSecreta = peliculas3[Math.floor(Math.random() * peliculas3.length)];
        }
    } else if (categoria === "Canciones") {
        //dependiendo del nivel, seleccionar el array correspondiente
        if (nivel === "fácil") {
            palabraSecreta = canciones1[Math.floor(Math.random() * canciones1.length)];
        } else if (nivel === "intermedio") {
            palabraSecreta = canciones2[Math.floor(Math.random() * canciones2.length)];
        } else if (nivel === "difícil") {
            palabraSecreta = canciones3[Math.floor(Math.random() * canciones3.length)];
        }
    }
    //enviar la palabra al localStorage para recogerla en la pantalla derrota
    localStorage.setItem('palabraSecreta', palabraSecreta);
    //la palabra aleatoria se va recorriendo para que si es compuesta no tenga en cuenta los espacios en blanco
    palabraMostrada = "";
    for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === ' ') {
            palabraMostrada += 'ㅤ';
        } else {
            palabraMostrada += '_';
        }
        //agrega una barra después de cada letra, excepto la última
        if (i < palabraSecreta.length - 1) {
            palabraMostrada += '/';
        }
    }
    //se inicializan los intentos a 6
    intentosRestantes = 6;
    segundos = 0;
    //se inicializa jugador actual al primer jugador
    jugadorActual = document.getElementById("nombreJ1").textContent;
    //se inicializan los puntos
    puntosJug1 = 0;
    puntosJug2 = 0;
    //se inicializan las variables que controlan si el juego ha terminado, y si se ha adivinado la palabra oculta
    adivinado = false;
    juegoTerminado = false;
    //se actualizan los datos
    actualizarVista();
}

//función para ir actualizando los datos de la partida.
function actualizarVista() {
    document.getElementById("palabra_a_adivinar").textContent = palabraMostrada;
    document.getElementById("intentosRestantes").textContent = "  " + intentosRestantes;
    document.getElementById("turnoJugador").textContent = "Jugador actual: " + jugadorActual;
    document.getElementById("letrasIncorrectas").textContent = "Letras incorrectas: " + letrasIncorrectas;
    document.getElementById("puntuacionJ1").textContent = "Puntuacion: " + puntosJug1;
    document.getElementById("puntuacionJ2").textContent = "Puntuacion: " + puntosJug2;
}

//funcion para adivinar la letra
function adivinarLetra(letra) {
    //se reinicia el menaje de error
    document.getElementById("mensaje_error").textContent = " ";
    let letrasOcultas = 0;
    //si la letra esta en la palabra oculta
    if (palabraSecreta.includes(letra)) {
        //si el juego no ha terminado y la palabra no ha sido adivinada
        if (!juegoTerminado && !adivinado) {
            //bucle que recorre la palabra buscando la letra seleccionada que entra por parametro
            for (var i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i].toLowerCase() === letra) {
                    let nuevaPalabra = palabraMostrada.split('/');
                    nuevaPalabra[i] = letra;
                    palabraMostrada = nuevaPalabra.join('/');
                }
            }
            letrasDesocultas++;
            //guardar el estado de la palabra en el localStorage
            localStorage.setItem('palabraSecreta', palabraSecreta);
            localStorage.setItem('palabraMostrada', palabraMostrada);
        }
        //agregar puntos y cambiar de jugador solo si se adivinó la letra de la palabra correctamente
        if (jugadorActual === document.getElementById("nombreJ1").textContent) {
            puntosJug1 += 2;
            actualizarVista();
        } else {
            puntosJug2 += 2;
            actualizarVista();
        }
        //deshabilitar el boton si ya ha sido pulsado
        document.getElementById("nuevaPartida").disabled = true;
        document.getElementById("boton" + letra.toUpperCase()).disabled = true;
        document.getElementById("audioLetraCorrecta").play();
        //despues de 3s redirigir a la pantalla del ranking
        setTimeout(function () {
            document.getElementById("audioLetraCorrecta").pause();
            document.getElementById("audioLetraCorrecta").currentTime = 0;
        }, 300);
        //sino esta en la palabra oculta
    } else {
        if (!juegoTerminado && !adivinado) {
            document.getElementById("nuevaPartida").disabled = true;
            //restar 1 punto al jugador actual
            if (jugadorActual === document.getElementById("nombreJ1").textContent) {
                puntosJug1 -= 1;
            } else {
                puntosJug2 -= 1;
            }
            actualizarVista();
            //se añade al array de letras incorrectas la letra incorrecta
            letrasIncorrectas.push(letra);
            //se meten las letras del array separadas por , dentro del div
            document.getElementById("letrasIncorrectas").textContent = "Letras incorrectas: " + letrasIncorrectas.join(', ');
            //deshabilitar el boton si ya ha sido pulsado
            document.getElementById("boton" + letra.toUpperCase()).disabled = true;
            //cada vez que se falla una letra se baja un intento y se cambia la imagen del ahorcado
            intentosRestantes--;
            //la imagen va cambiando por el nombre segun ha sido nombrado
            document.getElementById("imagen").src = "img/img" + (6 - intentosRestantes) + ".png";
            document.getElementById("audioLetraIncorrecta").play();
            //despues de 3s redirigir a la pantalla del ranking
            setTimeout(function () {
                document.getElementById("audioLetraIncorrecta").pause();
                document.getElementById("audioLetraIncorrecta").currentTime = 0;
            }, 300);
            //sino hay más intentos
            if (intentosRestantes === 0) {
                //cambiar la imagen del ahorcado a la última imagen
                document.getElementById("imagen").src = "img/img6.png";
                //el juego termina
                juegoTerminado = true;
                //la palabra ya ha sido adivinada
                adivinado = true;
                //reproducir el sonido de derrota
                document.getElementById("audioDerrota").play();
                //esperar un momento antes de cambiar de pagina
                setTimeout(function () {
                    document.getElementById("audioDerrota").pause();
                    document.getElementById("audioDerrota").currentTime = 0;
                    location.href = "pantallaDerrota.html";
                }, 1000);
            }
        }
    }

    //bucle que cuenta las letras ocultas para saber cuando gana el jugador
    for (var j = 0; j < palabraMostrada.length; j++) {
        if (palabraMostrada[j] === '_') {
            letrasOcultas++;
        }
    }

    //si ya no hay mas letras por desocultar se dice quien es el ganador 
    if (letrasOcultas === 0) {
        localStorage.setItem('ganador', jugadorActual);
        finalizarJuego();
    }

    //si el juego NO ha terminado se va cambiando el jugador
    if (!juegoTerminado && !adivinado) {
        jugadorActual = jugadorActual === document.getElementById("nombreJ1").textContent ? document.getElementById("nombreJ2").textContent : document.getElementById("nombreJ1").textContent;
    }

    //llamada a la funcion actualizar Vista
    actualizarVista();
}

//funcion que habilita el arrastre de los botones del teclado
function habilitarArrastre() {
    //selecciona todos los botones del teclado
    const botonesTeclado = document.querySelectorAll('.tecla');
    //itera sobre cada botón y cambia el atributo draggable a true
    botonesTeclado.forEach(boton => {
        boton.setAttribute('draggable', 'true');
    });
}

//funciones del drag and drop
function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

//funcion que controla si se arrastra el boton
function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    var draggedButton = document.getElementById(data);
    //obtener la letra del botón arrastrado
    var letraArrastrada = draggedButton.textContent;
    //llamar a una función para manejar la colocación en el lugar correcto
    colocarEnLugarCorrecto(letraArrastrada);
}

//funcion para colocar el boton en el div correcto
function colocarEnLugarCorrecto(letra) {

    //obtener todos los divs de las letras de la palabra
    const divsLetras = document.querySelectorAll('#palabra_a_adivinar div');
    let letraEncontrada = false;
    //iterar sobre los divs y encontrar todos los divs que tengan la letra correcta
    divsLetras.forEach(div => {
        //variable que guarda el contenido del div
        const contenidoDiv = div.textContent;
        //verificar si el contenido coincide con la letra
        if (contenidoDiv === letra) {
            letraEncontrada = true;
            //duplicar el botón
            const nuevoBoton = document.getElementById("boton" + letra.toUpperCase()).cloneNode(true);
            //agregar el botón como hijo del div
            div.appendChild(nuevoBoton);
        }
    });
    //si la letra no se encontró en ningún div y mostrar mensaje error
    if (!letraEncontrada) {
        document.getElementById("audioDerrota").play();
        setTimeout(function () {
            document.getElementById("audioDerrota").pause();
            document.getElementById("audioDerrota").currentTime = 0;
        }, 2000);
        //reducir puntos y cambiar de jugador si la palabra es incorrecta
        if (jugadorActual === document.getElementById("nombreJ1").textContent) {
            puntosJug1 -= 10;
        } else {
            puntosJug2 -= 10;
        }
        jugadorActual = jugadorActual === document.getElementById("nombreJ1").textContent ?
            document.getElementById("nombreJ2").textContent :
            document.getElementById("nombreJ1").textContent;
        actualizarVista();
        const estadoPalabraMostrada = localStorage.getItem('palabraMostrada');
        const estadoPalabraSecreta = localStorage.getItem('palabraSecreta');
        //borrar contenido anterior
        document.getElementById('palabra_a_adivinar').innerHTML = '';
        palabraSecreta = estadoPalabraSecreta;
        //poner la palabra anterior y seguir resolviendolo de forma normal
        document.getElementById('palabra_a_adivinar').innerHTML = estadoPalabraMostrada;
        //deshabilitar botones
        document.getElementById("resolverBoton").disabled = false;
        const botonesTeclado = document.querySelectorAll('.tecla');
        botonesTeclado.forEach(boton => {
            boton.disabled = false;
            boton.style.backgroundColor = "#2e86c1";
        });
        document.getElementById("botonComprobar").style.visibility = "hidden";
        document.getElementById("mensaje_error").textContent = "UPSS! La letra no se encontraba en la palabra";
    }
}

//funcion que se llama cuando se pulsa el boton de resolver
function resolverPalabra() {
    if (letrasDesocultas != 0) {
        document.getElementById("mensaje_error").textContent = " ";

        //verificar el ancho de la pantalla
        const anchoPantalla = window.innerWidth;
        const esPantallaMovil = anchoPantalla <= 768;
        if (esPantallaMovil) {
            //prompt para que el usuario ingrese la palabra
            const palabraIngresada = prompt("Ingresa la palabra:");
            if (palabraIngresada && palabraIngresada.toLowerCase() === palabraSecreta) {
                adivinado = true;
                if (jugadorActual === document.getElementById("nombreJ1").textContent) {
                    puntosJug1 += 30;
                } else {
                    puntosJug2 += 30;
                }
                localStorage.setItem('ganador', jugadorActual);
                finalizarJuego();
            } else {
                document.getElementById("mensaje_error").textContent = "La palabra ingresada no es correcta";
                //reducir puntos y cambiar de jugador si la palabra es incorrecta
                if (jugadorActual === document.getElementById("nombreJ1").textContent) {
                    puntosJug1 -= 10;
                } else {
                    puntosJug2 -= 10;
                }
                jugadorActual = jugadorActual === document.getElementById("nombreJ1").textContent ?
                    document.getElementById("nombreJ2").textContent :
                    document.getElementById("nombreJ1").textContent;
                actualizarVista();
                return;
            }
        } else {
            //si la pantalla no es móvil, utilizar drag and drop
            const botonesTeclado = document.querySelectorAll('.tecla');
            botonesTeclado.forEach(boton => {
                boton.disabled = true;
                boton.style.backgroundColor = "#09FFB1";
            });
            //desactivar el boton de nueva partida hasta que no se compruebe la palabra
            document.getElementById("nuevaPartida").disabled = true;
            document.getElementById("resolverBoton").disabled = true;
            //borrar contenido anterior
            document.getElementById('palabra_a_adivinar').innerHTML = '';
            //llamar a la función habilitar arrastre para permitir que las teclas puedan ser arrastradas
            habilitarArrastre();
            //poner la palabra en mayúsculas
            palabraSecreta = palabraSecreta.toUpperCase();
            //cambiar el contenido de la palabra a adivinar por divs
            const palabraSecretaDIV = document.getElementById('palabra_a_adivinar');
            const divGeneralPalabraSecreta = document.getElementById('div_palabra_a_adivinar');
            //bucle que crea para cada letra de la palabra un div
            for (let i = 0; i < palabraSecreta.length; i++) {
                //se crea el div
                let div = document.createElement("div");
                //se le mete de contenido la letra de la palabra secreta
                div.textContent = palabraSecreta[i];
                //añadir el id al div
                div.id = "letra" + palabraSecreta[i].toUpperCase();
                //ocultar el contenido del div
                div.style.color = "transparent";
                //añadir los métodos ondragover y ondrop
                div.setAttribute("ondragover", "allowDrop(event)");
                div.setAttribute("ondrop", "drop(event)");
                //añadir al div de la palabra secreta los divs de las letras
                palabraSecretaDIV.appendChild(div);
            }

            //crear el botón "Comprobar"
            let botonComprobar = document.createElement("button");
            botonComprobar.textContent = "Comprobar";
            botonComprobar.id = "botonComprobar";
            botonComprobar.onclick = comprobarPalabra;
            divGeneralPalabraSecreta.appendChild(botonComprobar);
        }
    } else {
        document.getElementById("mensaje_error").textContent = "Debes desocultar una letra para poder resolver la palabra";
    }
}

//función que comprueba si está bien la palabra
function comprobarPalabra() {
    //activar el botón de nueva partida y resolver si se pulsa comprobar
    document.getElementById("nuevaPartida").disabled = true;
    document.getElementById("resolverBoton").disabled = true;

    //obtener todos los divs de las letras de la palabra
    const divsLetras = document.querySelectorAll('#palabra_a_adivinar div');

    //variable para verificar si todas las letras están en el lugar correcto
    let todasEnLugarCorrecto = true;

    //variable para verificar si se ha introducido alguna letra mediante drag and drop
    let algunaLetraArrastrada = false;

    divsLetras.forEach(div => {
        //sacamos el id del padre
        const idPadre = div.id;
        //cogemos su última letra para compararlo
        const ultimoCaracterID = idPadre[idPadre.length - 1];
        //obtener el contenido del botón que está dentro del div
        const contenidoDivHijo = div.lastChild.textContent;

        //verificar si el contenido coincide con la última letra del ID
        if (ultimoCaracterID != contenidoDivHijo) {
            //cambiar el fondo del div a verde
            todasEnLugarCorrecto = false;
        }
        //verificar si se ha introducido alguna letra mediante drag and drop
        if (div.children.length > 0) {
            algunaLetraArrastrada = true;
        }
    });

    //si no se ha introducido ninguna letra mediante drag and drop, mostrar mensaje de error
    if (!algunaLetraArrastrada) {
        document.getElementById("mensaje_error").textContent = "Debes arrastrar al menos una letra para comprobar la palabra.";
        return;
    }

    //verificar si todas las letras han sido colocadas sin contar los espacios de la palabra
    const todasLasLetrasColocadas = Array.from(palabraSecreta.toUpperCase()).every(letra => {
        //ignorar espacios en blanco
        if (letra === ' ') {
            return true;
        }

        return document.getElementById("letra" + letra).children.length > 0;
    });

    //si no están colocadas todas las letras, mostrar mensaje de error
    if (!todasLasLetrasColocadas) {
        document.getElementById("mensaje_error").textContent = "Debes colocar todas las letras antes de comprobar la palabra.";
        return;
    }

    //si ha adivinado la palabra
    if (todasEnLugarCorrecto) {
        adivinado = true;
        //agregar puntos y cambiar de jugador solo si se adivinó la palabra correctamente
        if (jugadorActual === document.getElementById("nombreJ1").textContent) {
            puntosJug1 += 30;
        } else {
            puntosJug2 += 30;
        }
        localStorage.setItem('ganador', jugadorActual);
        finalizarJuego();
    }
}

//funcion para finalizar el juego y cambiar a la pantalla del ranking
function finalizarJuego() {
    //verificar quién es el jugador ganador
    let ganador, perdedor;
    if (adivinado) {
        //si se adivinó la palabra, el último jugador en adivinar es el ganador
        ganador = jugadorActual;
        perdedor = (jugadorActual === document.getElementById("nombreJ1").textContent) ? document.getElementById("nombreJ2").textContent : document.getElementById("nombreJ1").textContent;
    } else {
        //si no se adivinó la palabra, comparar las puntuaciones acumuladas
        if (puntosJug1 > puntosJug2) {
            ganador = document.getElementById("nombreJ1").textContent;
            perdedor = document.getElementById("nombreJ2").textContent;
        } else if (puntosJug2 > puntosJug1) {
            ganador = document.getElementById("nombreJ2").textContent;
            perdedor = document.getElementById("nombreJ1").textContent;
        } else if (puntosJug2 == puntosJug1) {
            ganador = document.getElementById("nombreJ2").textContent;
            perdedor = document.getElementById("nombreJ1").textContent;
        } else {
            document.getElementById("audioVictoria").play();
            setTimeout(function () {
                document.getElementById("audioVictoria").pause();
                document.getElementById("audioVictoria").currentTime = 0;
                location.href = "pantallaFinal.html";
            }, 2000);
            return;
        }
    }

    //guardar al jugador ganador y al perdedor
    localStorage.setItem('ganador', ganador);
    localStorage.setItem('segundoPuesto', perdedor);

    //guardar las puntuaciones en el localStorage
    localStorage.setItem('puntuacionGanador', (ganador === document.getElementById("nombreJ1").textContent) ? puntosJug1 : puntosJug2);
    localStorage.setItem('puntuacionSegundo', (perdedor === document.getElementById("nombreJ1").textContent) ? puntosJug1 : puntosJug2);

    document.getElementById("audioVictoria").play();
    //despues de 3s redirigir a la pantalla del ranking
    setTimeout(function () {
        document.getElementById("audioVictoria").pause();
        document.getElementById("audioVictoria").currentTime = 0; // Reiniciar el tiempo de reproducción
        location.href = "pantallaFinal.html";
    }, 2000);
}

var segundos = 0;
var elemento = document.getElementById("segundos");

//recuperar el último valor almacenado en localStorage
if (localStorage.getItem("ultimoSegundo")) {
    segundos = parseInt(localStorage.getItem("ultimoSegundo"));
}

//funcion de contador segundos
var intervalo = window.setInterval(function () {
    elemento.innerHTML = segundos;
    segundos++;

    //guardar el último valor en localStorage
    localStorage.setItem("ultimoSegundo", segundos);
}, 1000);

inicializarJuego();