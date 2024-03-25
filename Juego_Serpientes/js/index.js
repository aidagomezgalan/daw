"use strict";
//Variables globales
let firstCell, lastCell;
let exploradora;
let time = 15;
let snakesMoveInterval, gameTimerInterval;
const SNAKE_REPEAT = 4;

document.addEventListener("DOMContentLoaded", () => {
  createBoard();
  createSnakes();
  document.addEventListener("keydown", exploradoraMove);
});

//Función para crear el tablero de juego de 10x10
const createBoard = () => {
  let table = document.createElement("table");
  document.querySelector("#table").appendChild(table);
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("tr");
    table.appendChild(row);
    let j = 0;
    for (j = 0; j < 10; j++) {
      const column = document.createElement("td");
      row.appendChild(column);
    }
  }
  //Recogemos la puerta y la exploradora (primera y última casilla)
  firstCell = table.firstElementChild.children[0];
  firstCell.classList.add("door_opened");
  lastCell =
    table.lastElementChild.children[table.lastElementChild.children.length - 1];
  lastCell.classList.add("exploradora");
  //Recogemos las celdas del tablero y le asignamos un id
  let cells = document.querySelectorAll("td");
  let numberCell = 1;
  cells.forEach((cell) => {
    cell.setAttribute("id", numberCell);
    numberCell++;
  });
};

//Función para crear las serpientes de manera aleatoria
const createSnakes = () => {
  //Recogemos las celdas, por tipo de serpiente, donde crearemos las serpientes aleatoriamente
  let snakes1 = [];
  let snakes2 = [];
  let snakes3 = [];
  let cells = document.querySelectorAll("td");
  for (let i = 0; i < SNAKE_REPEAT; i++) {
    snakes1.push(cells[Math.floor(Math.random() * 98) + 1]);
    snakes2.push(cells[Math.floor(Math.random() * 98) + 1]);
    snakes3.push(cells[Math.floor(Math.random() * 98) + 1]);
    while (snakes1[i].classList != 0) {
      snakes1[i] = cells[Math.floor(Math.random() * 98) + 1];
    }
    snakes1[i].classList.add("serpiente1", "serpientes");
    while (snakes2[i].classList != 0) {
      snakes2[i] = cells[Math.floor(Math.random() * 98) + 1];
    }
    snakes2[i].classList.add("serpiente2", "serpientes");
    while (snakes3[i].classList != 0) {
      snakes3[i] = cells[Math.floor(Math.random() * 98) + 1];
    }
    snakes3[i].classList.add("serpiente3", "serpientes");
  }
  //Intervalo que ejecuta el movimiento de las serpientes cada segundo
  snakesMoveInterval = setInterval(snakesMove, 1000);

  //Intervalo que ejecuta el temporizador cada segundo
  gameTimerInterval = setInterval(gameTimer, 1000);
};
//Función para mover las serpientes
const snakesMove = () => {
  let snakes = document.querySelectorAll(".serpientes");
  let cells = document.querySelectorAll("td");
  snakes.forEach((snake) => {
    let idCell = parseInt(snake.id);
    if (snake.classList.contains("exploradora") || time == 0) stopGame();
    if (snake.classList.contains("serpiente1")) {
      if (snake == lastCell) {
        snake.classList.remove("serpiente1", "serpientes");
        if (
          snake.classList.contains("serpiente2") ||
          snake.classList.contains("serpiente3")
        )
          snake.classList.add("serpientes");
        snake = firstCell.nextSibling;
        snake.classList.add("serpiente1", "serpientes");
      } else {
        snake.classList.remove("serpiente1", "serpientes");
        if (
          snake.classList.contains("serpiente2") ||
          snake.classList.contains("serpiente3")
        )
          snake.classList.add("serpientes");
        snake = cells[idCell++];
        snake.classList.add("serpiente1", "serpientes");
      }
    } else if (snake.classList.contains("serpiente3")) {
      if (snake == lastCell) {
        snake.classList.remove("serpiente3", "serpientes");
        if (
          snake.classList.contains("serpiente2") ||
          snake.classList.contains("serpiente1")
        )
          snake.classList.add("serpientes");
        snake = firstCell.nextSibling;
        snake.classList.add("serpiente3", "serpientes");
      } else {
        snake.classList.remove("serpiente3", "serpientes");
        if (
          snake.classList.contains("serpiente2") ||
          snake.classList.contains("serpiente1")
        )
          snake.classList.add("serpientes");
        snake = cells[idCell++];
        snake.classList.add("serpiente3", "serpientes");
      }
    } else if (snake.classList.contains("serpiente2")) {
      if (idCell > 90 && idCell <= cells.length) {
        idCell = parseInt(snake.id);
        snake.classList.remove("serpiente2", "serpientes");
        snake.classList.add("serpientes");
        snake = cells[idCell - 91];
        snake.classList.add("serpiente2", "serpientes");
      } else {
        snake.classList.remove("serpiente2", "serpientes");
        snake.classList.add("serpientes");
        snake = cells[idCell + 9];
        snake.classList.add("serpiente2", "serpientes");
      }
    }
  });
};

//Función para el movimiento de la exploradora
const exploradoraMove = (e) => {
  exploradora = document.querySelector(".exploradora");
  let cells = document.querySelectorAll("td");
  if (e.key == "ArrowLeft" && exploradora.previousSibling != null) {
    exploradora.classList.remove("exploradora");
    exploradora.previousSibling.classList.add("exploradora");
    stopGame();
  } else if (e.key == "ArrowRight" && exploradora.nextSibling != null) {
    exploradora.classList.remove("exploradora");
    exploradora.nextSibling.classList.add("exploradora");
    stopGame();
  } else if (
    e.key == "ArrowUp" &&
    exploradora.parentElement.previousSibling != null
  ) {
    for (let i = 1; i < 100; i++) {
      if (cells[i].classList.contains("exploradora")) {
        cells[i].classList.remove("exploradora");
        i -= 10;
        cells[i].classList.add("exploradora");
        stopGame();
      }
    }
  } else if (
    e.key == "ArrowDown" &&
    exploradora.parentElement.nextSibling != null
  ) {
    for (let i = 1; i < 100; i++) {
      if (cells[i].classList.contains("exploradora")) {
        cells[i].classList.remove("exploradora");
        i += 10;
        cells[i].classList.add("exploradora");
        stopGame();
      }
    }
  }
};

//Función que para el juego
const stopGame = () => {
  exploradora = document.querySelector(".exploradora");
  if (
    exploradora.classList.contains("serpiente1") ||
    exploradora.classList.contains("serpiente2") ||
    exploradora.classList.contains("serpiente3") ||
    exploradora.classList.contains("door_opened") ||
    time == 0
  ) {
    clearInterval(snakesMoveInterval);
    clearInterval(gameTimerInterval);
    let boton = document.querySelector("button");
    if (boton != null) boton.removeAttribute("disabled");
    if (exploradora.classList.contains("door_opened")) {
      exploradora.classList.remove("door_opened");
      exploradora.classList.add("door_closed");
      msg("ganadora");
    } else if (time == 0) {
      msg("tiempo");
    } else {
      exploradora.classList.add("devoradora");
      msg("devorada");
    }
    exploradora.classList.remove("exploradora");
    document.removeEventListener("keydown", exploradoraMove);
    startButtom();
  }
};

//Función que muestra un mensaje cuando el juego termina, con la librería sweetalert
const msg = (state) => {
  if (state == "devorada")
    Swal.fire({
      title: "¡¡¡Has sido devorad@ por la serpiente!!!",
      imageUrl: "./images/serpienteComiendo.gif",
      imageWidth: 200,
      imageAlt: "Devorada",
    });
  else if (state == "ganadora")
    Swal.fire({
      title: `¡¡¡Has escapado de las serpientes en ${15 - time} segundos!!!`,
      imageUrl: "./images/ganadora.gif",
      imageWidth: 200,
      imageAlt: "Ganadora",
    });
  else if (state == "tiempo")
    Swal.fire({
      title: "¡¡¡Has agotado el tiempo!!!",
      imageUrl: "./images/finalizado.gif",
      imageWidth: 200,
      imageAlt: "Tiempo finalizado",
    });
};

//Función que muestra el botón de inicio del juego
const startButtom = () => {
  let divBoton = document.querySelector("#boton");
  if (divBoton.firstElementChild == null) {
    let boton = divBoton.appendChild(document.createElement("button"));
    boton.textContent = "Iniciar Juego";
  }
  boton.addEventListener("click", startGame);
};

//Función que reinicia el juego
const startGame = () => {
  let devorada = document.querySelector(".devoradora");
  let boton = document.querySelector("button");
  let snakes = document.querySelectorAll(
    ".serpiente1, .serpiente2, .serpiente3"
  );
  snakes.forEach((snake) =>
    snake.classList.remove(
      "serpiente1",
      "serpiente2",
      "serpiente3",
      "serpientes"
    )
  );
  time = 15;
  if (devorada != null) devorada.classList.remove("devoradora");
  lastCell.classList.add("exploradora");
  firstCell.classList.remove("door_closed");
  firstCell.classList.add("door_opened");
  createSnakes();
  boton.setAttribute("disabled", "");
  document.addEventListener("keydown", exploradoraMove);
};

//Función que controla el tiempo de juego
const gameTimer = () => {
  let divTime = document.querySelector("#time");
  time -= 1;
  divTime.textContent = `Escapa en: ${time} segundos`;
};
