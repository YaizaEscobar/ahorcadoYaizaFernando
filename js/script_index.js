let avatarSeleccionadoJugador1 = null;
let avatarSeleccionadoJugador2 = null;

function validarFormulario() {
    const avatarSeleccionadoJugador1 = document.querySelector("#avatarContainer1 .avatar.selected");
    const avatarSeleccionadoJugador2 = document.querySelector("#avatarContainer2 .avatar.selected");

    if (document.getElementById("nombreJug1").value == "" || document.getElementById("nombreJug2").value == "") {
        errorMensaje.textContent = "Debes introducir el nombre del jugador en ambos jugadores";
        errorMensaje.style.color = "red";
        return false;
    }

    if (!avatarSeleccionadoJugador1 || !avatarSeleccionadoJugador2) {
        errorMensaje.textContent = "Debes seleccionar un avatar en ambos jugadores";
        errorMensaje.style.color = "red";
        return false;
    }

    //reinicia el mensaje de error y permite enviar el formulario
    errorMensaje.textContent = "";
    return true;
}

function enviarDatos() {
    const nombreJug1 = document.getElementById('nombreJug1').value;
    const nombreJug2 = document.getElementById('nombreJug2').value;
    const categoriaSeleccionada = document.getElementById('selectCategoria').value;
    const nivelSeleccionado = document.getElementById('selectNivel').value;

    //obtiene la ruta del avatar seleccionado para el Jugador 1
    const avatarJug1Element = document.querySelector('#avatarContainer1 .avatar.selected');
    const rutaAvatarJug1 = avatarJug1Element ? avatarJug1Element.src : '';

    //obtiene la ruta del avatar seleccionado para el Jugador 2
    const avatarJug2Element = document.querySelector('#avatarContainer2 .avatar.selected');
    const rutaAvatarJug2 = avatarJug2Element ? avatarJug2Element.src : '';

    //almacena la información en localStorage
    localStorage.setItem('nombreJug1', nombreJug1);
    localStorage.setItem('avatarJug1', rutaAvatarJug1);
    localStorage.setItem('nombreJug2', nombreJug2);
    localStorage.setItem('avatarJug2', rutaAvatarJug2);
    localStorage.setItem('categoriaSeleccionada', categoriaSeleccionada);
    localStorage.setItem('nivelSeleccionado', nivelSeleccionado);

    return true;
}

function obtenerRutaAvatar(nombreAvatar) {
    return 'img/' + nombreAvatar;
}

function seleccionarAvatar(jugador, avatar) {
    const avatarContainers = document.querySelectorAll(`.avatarContainer${jugador} .avatar`);

    //desactiva la selección para todos los avatares del jugador
    avatarContainers.forEach(avatar => {
        avatar.classList.remove('selected');
    });

    //activa la selección solo para el avatar clickeado
    avatar.classList.add('selected');

    //actualiza el estado de selección según el jugador
    if (jugador === 1) {
        avatarSeleccionadoJugador1 = avatar.src;
    } else if (jugador === 2) {
        avatarSeleccionadoJugador2 = avatar.src;
    }
}