


const celdas = document.querySelectorAll(".celda");

const estadoJuegoDisplay = document.getElementById("estadoJuego");

const botonReiniciar = document.getElementById("reiniciarJuego");


let tablero = ["", "", "", "", "", "", "", "", ""]; 
let jugadorActual = "X"; 
let juegoActivo = true; 



const condicionesVictoria = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6], 
];




function manejarClicCelda(evento) {

  const celdaClicada = evento.target;

  const indiceCeldaClicada = parseInt(celdaClicada.dataset.celdaIndice);

 
  if (tablero[indiceCeldaClicada] !== "" || !juegoActivo) {
    return; 
  }



  tablero[indiceCeldaClicada] = jugadorActual;

  celdaClicada.textContent = jugadorActual;

  celdaClicada.classList.add(jugadorActual.toLowerCase());
  celdaClicada.classList.add("ocupada");


  verificarResultadoJuego();
}

function verificarResultadoJuego() {
  let hayGanador = false;

  for (let i = 0; i < condicionesVictoria.length; i++) {
    const condicion = condicionesVictoria[i]; 

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


  if (hayGanador) {
    estadoJuegoDisplay.textContent = `¡El Jugador ${jugadorActual} ha ganado!`;
    juegoActivo = false; 
    return;
  }



  const esEmpate = !tablero.includes(""); 

  if (esEmpate) {
    estadoJuegoDisplay.textContent = "¡Es un Empate!";
    juegoActivo = false; 
    return;
  }

  cambiarJugador();
}


function cambiarJugador() {
  jugadorActual = jugadorActual === "X" ? "O" : "X"; 
  estadoJuegoDisplay.textContent = `Turno del Jugador ${jugadorActual}`;
}


function reiniciarJuego() {
  tablero = ["", "", "", "", "", "", "", "", ""]; 
  jugadorActual = "X"; 
  juegoActivo = true; 


  celdas.forEach((celda) => {
    celda.textContent = "";
    celda.classList.remove("x", "o", "ocupada");
  });


  estadoJuegoDisplay.textContent = `Turno del Jugador ${jugadorActual}`;
}


celdas.forEach((celda) => {
  celda.addEventListener("click", manejarClicCelda);
});

botonReiniciar.addEventListener("click", reiniciarJuego);

