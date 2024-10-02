// Seleccionamos el div que representa al player en el DOM
const player = document.getElementById('player');


// Variables de control de movimiento:
let playerPositionX = 50; // Posición inicial en el eje X (coincide con el valor de 'left' en el CSS)
let playerJumping = false; // Inicialmente el player no está saltando

// Evento que escucha las teclas presionadas por el usuario
document.addEventListener('keydown', (event) => {
    //tengo que crear movimientos verticales ahora, separando los diferentes casos.
    const key = event.key.toLowerCase(); // Convierte la tecla presionada a minúscula para que me funcione tanto con el bloq. mayusc como sin él
    // Si la tecla presionada es la D
    if (key === 'd') {
        playerPositionX += 10; // Mueve el player 10px hacia la derecha
    }
    // Si la tecla presionada es la A
    else if (key === 'a') {
        playerPositionX -= 10; // Mueve el player 10px hacia la izquierda
    }
    // Si se presiona la barra espaciadora (para saltar)
    else if (event.key === ' ') {
        // Solo permite que salte si no está ya saltando. Más adelante, puedo desarrollar un doble salto
        if (!playerJumping) {
            jumpPlayer(); // Llama a la función para realizar el salto
        }
    }
    // Actualiza la posición del player en el mapa
    updatePlayerPosition();
});

//--------------------------------------------------------------------FUNCIONES--------------------------------------------------------------------:

// Función que actualiza la posición del player en el mapa
function updatePlayerPosition() {
    player.style.left = playerPositionX + 'px'; // Cambia la propiedad 'left' del estilo del player, px siendo la unidad de pixeles
}

// Función que maneja el salto del player
function jumpPlayer() {
    playerJumping = true; // Marca que el player está en el aire
    let jumpHeight = 0; // Altura inicial del salto
    // Intervalo que incrementa la altura del salto gradualmente
    let jumpingInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpingInterval); // Detiene el salto cuando alcanza la altura máxima
            fallPlayer(); // Llama a la función para hacer que el player caiga
        } else {
            jumpHeight += 10; // Aumenta la altura del salto
            player.style.bottom = jumpHeight + 'px'; // Actualiza la posición vertical del player
        }
    }, 30); // Intervalo de 30 milisegundos para hacer el salto suave
}

// Función que maneja la caída del player después del salto
function fallPlayer() {
    // Intervalo que reduce la altura hasta que el player vuelve al suelo
    let fallInterval = setInterval(() => {
        if (parseInt(player.style.bottom) <= 0) {
            clearInterval(fallInterval); // Detiene la caída cuando el player toca el suelo
            player.style.bottom = '0px'; // Asegura que el player esté en el suelo
            playerJumping = false; // Marca que el player ha dejado de saltar
        } else {
            player.style.bottom = parseInt(player.style.bottom) - 10 + 'px'; // Baja la altura gradualmente
        }
    }, 30); // Intervalo de 30 milisegundos para hacer la caída suave
}
