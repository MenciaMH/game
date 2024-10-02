// Seleccionamos el div que representa al player en el DOM
const player = document.getElementById('player');

// Variables de control de movimiento:
let playerPositionX = 50; // Posición inicial en el eje X (coincide con el valor de 'left' en el CSS)
let playerJumping = false; // Inicialmente el player no está saltando

// Variables para el estado de las teclas (para detectar los movimientos)
let keyA = false; // Estado de la tecla A
let keyD = false; // Estado de la tecla D

// Variables de módulos de movimiento
const avanceLentoA = -10;
const avanceLentoD = 10;
const avanceRapidoA = -20;
const avanceRapidoD = 20;

// Evento que escucha las teclas PRESIONADAS por el usuario
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase(); // Convierte la tecla presionada a minúscula

    // Manejo del estado de las teclas A y D
    if (key === 'a') {
        keyA = true; // La tecla A está presionada
    }
    if (key === 'd') {
        keyD = true; // La tecla D está presionada
    }

    // Si la barra espaciadora está presionada
    if (event.code === 'Space') {
        if (keyA && !playerJumping) {
            jumpPlayer(avanceLentoA); // Salta hacia la izquierda
        } else if (keyD && !playerJumping) {
            jumpPlayer(avanceLentoD); // Salta hacia la derecha
        } else if(!keyA && !keyD && !playerJumping){
            jumpPlayer(0); //Salta solo hacia arriba
        }
    }
});

// Evento que escucha cuando se SUELTAN las teclas
document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'a') {
        keyA = false; // La tecla A ya no está presionada
    }
    if (key === 'd') {
        keyD = false; // La tecla D ya no está presionada
    }
});

// Intervalo que mueve al jugador
setInterval(() => {
    if (keyA && !playerJumping) {
        playerPositionX += avanceLentoA; // Mueve el player hacia la izquierda
        updatePlayerPosition(); // Actualiza la posición en cada paso
    }
    if (keyD && !playerJumping) {
        playerPositionX += avanceLentoD; // Mueve el player hacia la derecha
        updatePlayerPosition(); // Actualiza la posición en cada paso
    }
}, 100); // Ajusta la frecuencia de movimiento

//--------------------------------------------------------------------FUNCIONES--------------------------------------------------------------------:

// Función que actualiza la posición del player en el mapa
function updatePlayerPosition() {
    player.style.left = playerPositionX + 'px'; // Cambia la propiedad 'left' del estilo del player, px siendo la unidad de pixeles
}

// Función que maneja el salto del player
function jumpPlayer(direction) {
    if (playerJumping) return; // Si ya está saltando, no hacer nada

    playerJumping = true; // Marca que el player está en el aire
    let jumpHeight = 0; // Altura inicial del salto

    // Movimiento horizontal
    const moveDirection = direction; // Almacena la dirección del movimiento horizontal

    // Intervalo que incrementa la altura del salto gradualmente
    let jumpingInterval = setInterval(() => {
        if (jumpHeight >= 100) { // Verifica si ha alcanzado la altura máxima
            clearInterval(jumpingInterval); // Detiene el salto cuando alcanza la altura máxima
            fallPlayer(moveDirection); // Llama a la función para hacer que el player caiga
        } else {
            jumpHeight += 10; // Aumenta la altura del salto
            player.style.bottom = jumpHeight + 'px'; // Actualiza la posición vertical del player
            playerPositionX += moveDirection; // Ajusta la posición horizontal durante el salto
            updatePlayerPosition(); // Asegúrate de actualizar la posición en cada paso
        }
    }, 30); // Intervalo de 30 milisegundos para hacer el salto suave
}

// Función que maneja la caída del player después del salto
function fallPlayer(direction) {
    // Intervalo que reduce la altura hasta que el player vuelve al suelo
    let fallInterval = setInterval(() => {
        if (parseInt(player.style.bottom) <= 0) {
            clearInterval(fallInterval); // Detiene la caída cuando el player toca el suelo
            player.style.bottom = '0px'; // Asegura que el player esté en el suelo
            playerJumping = false; // Marca que el player ha dejado de saltar
        } else {
            player.style.bottom = parseInt(player.style.bottom) - 10 + 'px'; // Baja la altura gradualmente
            playerPositionX += direction; // Mantiene el movimiento horizontal durante la caída
            updatePlayerPosition(); // Actualiza la posición en cada paso de la caída
        }
    }, 30); // Intervalo de 30 milisegundos para hacer la caída suave
}
