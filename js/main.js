// --- Variables Globales y Selectores ---

// Obtenemos todos los elementos con la clase 'celda' (cada cuadro del tablero)
const celdas = document.querySelectorAll(".celda");
// Obtenemos el elemento donde mostraremos el estado del juego (turno, ganador, empate)
const estadoJuegoDisplay = document.getElementById("estadoJuego");
// Obtenemos el botón de reiniciar
const botonReiniciar = document.getElementById("reiniciarJuego");

// Estado del juego
let tablero = ["", "", "", "", "", "", "", "", ""]; // Representa el tablero. Vacío al inicio.
let jugadorActual = "X"; // El jugador que empieza es 'X'
let juegoActivo = true; // Indica si el juego sigue en curso (no ha habido ganador o empate)

// --- Condiciones de Victoria ---
// Todas las posibles combinaciones para ganar en el Tic-Tac-Toe
const condicionesVictoria = [
  [0, 1, 2], // Fila superior
  [3, 4, 5], // Fila central
  [6, 7, 8], // Fila inferior
  [0, 3, 6], // Columna izquierda
  [1, 4, 7], // Columna central
  [2, 5, 8], // Columna derecha
  [0, 4, 8], // Diagonal principal
  [2, 4, 6], // Diagonal secundaria
];

// --- Funciones del Juego ---

// Función para manejar el clic en una celda
function manejarClicCelda(evento) {
  // Obtenemos la celda en la que se hizo clic
  const celdaClicada = evento.target;
  // Obtenemos el índice de la celda (el número que le asignamos en el HTML)
  const indiceCeldaClicada = parseInt(celdaClicada.dataset.celdaIndice);

  // Verificamos si la celda ya está ocupada o si el juego no está activo
  if (tablero[indiceCeldaClicada] !== "" || !juegoActivo) {
    return; // Si es así, no hacemos nada
  }

  // Si la celda está libre y el juego activo:
  // 1. Actualizamos el tablero con la marca del jugador actual
  tablero[indiceCeldaClicada] = jugadorActual;
  // 2. Mostramos la marca del jugador en la celda del HTML
  celdaClicada.textContent = jugadorActual;
  // 3. Añadimos una clase CSS para estilizar la marca (X o O) y marcarla como ocupada
  celdaClicada.classList.add(jugadorActual.toLowerCase());
  celdaClicada.classList.add("ocupada");

  // 4. Verificamos si alguien ha ganado o si es un empate
  verificarResultadoJuego();
}

// Función para verificar si hay un ganador o un empate
function verificarResultadoJuego() {
  let hayGanador = false;

  for (let i = 0; i < condicionesVictoria.length; i++) {
    const condicion = condicionesVictoria[i]; // Ej: [0, 1, 2]

    const celda1 = tablero[condicion[0]];
    const celda2 = tablero[condicion[1]];
    const celda3 = tablero[condicion[2]];

    if (celda1 === "" || celda2 === "" || celda3 === "") {
      continue; 
    }

    if (celda1 === celda2 && celda2 === celda3) {
      hayGanador = true;
      break; 
    }
  }

  // Si hay un ganador:
  if (hayGanador) {
    estadoJuegoDisplay.textContent = `¡El Jugador ${jugadorActual} ha ganado!`;
    juegoActivo = false; // Detenemos el juego
    return; // Salimos de la función
  }

  // Si no hay ganador, verificamos si es un empate.
  // Un empate ocurre si todas las celdas están ocupadas y no hay ganador.
  const esEmpate = !tablero.includes(""); // Si no hay celdas vacías, es un empate

  if (esEmpate) {
    estadoJuegoDisplay.textContent = "¡Es un Empate!";
    juegoActivo = false; // Detenemos el juego
    return;
  }

  // Si no hay ganador ni empate, cambiamos de jugador
  cambiarJugador();
}

// Función para cambiar el turno del jugador
function cambiarJugador() {
  jugadorActual = jugadorActual === "X" ? "O" : "X"; // Si era 'X', ahora es 'O', y viceversa
  estadoJuegoDisplay.textContent = `Turno del Jugador ${jugadorActual}`;
}

// Función para reiniciar el juego
function reiniciarJuego() {
  tablero = ["", "", "", "", "", "", "", "", ""]; // Limpiamos el tablero lógico
  jugadorActual = "X"; // Reseteamos al jugador inicial
  juegoActivo = true; 

  // Limpiamos el contenido y las clases CSS de todas las celdas visuales
  celdas.forEach((celda) => {
    celda.textContent = "";
    celda.classList.remove("x", "o", "ocupada");
  });

  // Actualizamos el mensaje de estado
  estadoJuegoDisplay.textContent = `Turno del Jugador ${jugadorActual}`;
}


// Agregamos un 'listener' a cada celda para detectar clics
celdas.forEach((celda) => {
  celda.addEventListener("click", manejarClicCelda);
});

// Agregamos un 'listener' al botón de reiniciar
botonReiniciar.addEventListener("click", reiniciarJuego);

