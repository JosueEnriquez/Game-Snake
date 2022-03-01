'use strict'

//! HTML Elements
const settingBoard = document.getElementById('settingBoard');  //* Hace referencia la ventana de settings
const btnSetting = document.getElementById('buttonSetting');  //* Hace referencia al botón Setting
const btnClose = document.getElementById('buttonClose');  //* Hace referencia al botón Close Setting
const btnApply = document.getElementById('buttonApply');  //* Hace referencia al botón Apply de Setting
const bntReplay = document.getElementById("buttonReplay");  //* Hace referencia al botón Replay
const board = document.getElementById("board");  //* Hace referencia al div contenedor del tablero
const score = document.getElementById("scoreIndicator");  //* Hace referencia al span que muestra los puntos

//! Game Settings

let boardWidth = 20;  //* Define el ancho del tablero
let boardHeight = 20;  //* Define la altura del tablero
const gameSpeed = 100;  //* Define la velocidad de la serpiente
const squareTypes = {  //* Objeto que contiene los tipos de valores que podría almacenar el boardSquares
  emptySquare: '◻',  //* Valor de un espacio vacío
  snakeSquare: '🐍',  //* Valor de un espacio ocupado por el cuerpo de la serpiente
  foodSquare: '🍬'  //* Valor de un espacio ocupado por una comida
}
const directions = {  //* Objeto que contiene los valores de las direcciones, que servirán para calcular la posición siguiente
  ArrowUp: -100,  //* Valor que se utiliza si la serpiente se mueve hacia arriba
  ArrowDown: 100,  //* Valor que se utiliza si la serpiente se mueve hacia abajo
  ArrowRight: 1,  //* Valor que se utiliza si la serpiente se mueve hacia la derecha
  ArrowLeft: -1,  //* Valor que se utiliza si la serpiente se mueve hacia la izquierda
}; 

//! Game Variables
let blockedButtons = false;  //*Sirve para bloquear la dirección hasta que la serpiente se haya movido
let start = false;  //*Sirve para detectar cuando el juego comenzó
let moveInterval;  //*Almacena un setInterval
let boardSquares;  //*Almacena un Array bidimensional que servirá para crear el tablero
                   //*Adicionalmente, guarda toda la información del tablero
let emptySquares;  //*Almacena un Array que contiene las posiciones de los espacios vacíos, con referencia a boardSquares
let snake;  //*Almacena un Array que contiene las posiciones del cuerpo de la serpiente, con referencia a boardSquares
let direction;  //*Almacena la dirección del movimiento de la serpiente
let gameScore;  //*Almacena el puntaje

//! Game Logic

//? Creación del tablero

const createBoard = () => {  //! Esta función crea el tablero consumiendo un Array bidimensional
  board.style.gridTemplateColumns = `repeat(${boardWidth}, 1fr)`;
  boardSquares = Array.from(Array(boardHeight), () => new Array(boardWidth).fill(squareTypes.emptySquare));
  boardSquares.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const rowValue = String(rowIndex).padStart(2,'0');
      const columnValue = String(columnIndex).padStart(2,'0');

      const squareValue = rowValue + columnValue;
      const squareElement = document.createElement("div");
      squareElement.setAttribute('class', 'square emptySquare');
      squareElement.setAttribute('id', squareValue);
      board.appendChild(squareElement);
      emptySquares.push(squareValue);
    })
  })
}                            //! Creando elementos por cada valor almacenado
                             //! Agregandoles una Clase y un Id basado en el indice de su pocision
                             //! Tomando como referencia un Array bidimensional de 10000 posiciones
                             //! Ejemplos :
                             //! boardSquares[0][0] crearia un elemento div con el Id 0000
                             //! boardSquares[1][0] crearia un elemento div con el Id 0100
                             //! boardSquares[3][4] crearia un elemento div con el Id 0304
                             //! boardSquares[9][9] crearia un elemento div con el Id 0909
                             //! boardSquares[10][2] crearia un elemento div con el Id 1002
                             //! boardSquares[8][20] crearia un elemento div con el Id 0820

//? Pintado de espacio en el tablero

const drawSquare = (square, type) => {  //! Esta función pinta en el tablero un espacio, utilizando los parámetros que se le pasa
  const row = Number(square[0] + square[1]);
  const column = Number(square[2] + square[3]);
	
  boardSquares[row][column] = squareTypes[type];
  const squareElement = document.getElementById(square);
  squareElement.setAttribute('class', `square ${type}`);

  if ( type === 'emptySquare' ) {
    emptySquares.push(square);
  } else if ( emptySquares.indexOf(square) !== -1 ) {
    emptySquares.splice(emptySquares.indexOf(square), 1)
  }
}                                       //! Adicionalmente, realiza algunas comprobaciones consultando al boardSquare
                                        //! Para saber si el espacio a pintar es un espacio vacío
                                        //! De ser así, agrega el espacio al emptySquares
                                        //! O si no es un espacio ocupado por la comida
                                        //! De ser así, quita el espacio del emptySquares
                                        //! Primer Parámetro ⇒ Indica el Id del div a pintar
                                        //! Segundo Parámetro ⇒ Indica el tipo de espacio a pintar
                                        //! Ejemplos :
                                        //! drawSquare(0485, emptySquare)
                                        //! drawSquare(0505, snakeSquare)
                                        //! drawSquare(0945, foodSquare)

//? Creación de la serpiente

const createSnake = () => {  //! Esta función le atribuye a la variable snake un Array
  let startPosition;
  if ( boardWidth % 2 == 0 ) {
    startPosition = String( boardWidth / 2 - 1 ).padStart(2, '0')
  } else {
    startPosition = String( (boardWidth + 1) / 2 - 1 ).padStart(2, '0')
  }
  
  if ( boardHeight % 2 == 0 ) {
    startPosition = startPosition + String( (boardHeight) / 2).padStart(2, '0')
  } else {
    startPosition = startPosition + String( (boardHeight + 1) / 2 - 1 ).padStart(2, '0')
  }

  snake = [startPosition]
}                            //! Con el valor de las posiciones iniciales de la serpiente

//? Pinta a la serpiente

const drawSnake = () => {  //! Esta función pinta a la serpiente en el tablero utilizando la función drawSquare
  snake.forEach( square => drawSquare(square, 'snakeSquare'))
}

//? Creación y pintado de la comida

const createRandomFood = () => {  //! Esta función pinta una comida en una posición vacía del tablero
  const randomEnptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)]
  drawSquare(randomEnptySquare, 'foodSquare')
}                                 //! Para ello escoge una posición aleatoria del Array emptySquares y lo guarda en una variable
                                  //! Seguido le pasa dicha variable como primer parámetro a la función drawSquare y de segundo parámetro foodSquare

//? Actualiza el contador de puntaje

const updateScore = () => {  //! Esta función actualiza el valor del puntaje en el html
  score.innerText = String(gameScore).padStart(2, '0');
}

//? Logica de comer una comida

const addFood = () => {  //! Esta función se ejecuta en el momento que la serpiente come una comida
  createRandomFood();
  gameScore++;
  updateScore()
}                        //! Y suma mas uno al score

//? Actualiza la dirección

const setDirection = (newDirection) => {  //! Esta función actualiza la dirección del movimiento de la serpiente
  direction = blockedButtons ? direction : newDirection;
  blockedButtons = true;
  direction = newDirection;
}                                         //! Al valor que se le pasa como parámetro

//? Detecta la dirección

const directionEvent = (key) => {  //! Esta función verifica que tecla fue presionada y realiza algunas validaciones
  switch (key.code) {
    case 'ArrowUp':
      direction != 'ArrowDown' && setDirection(key.code)
      break;
    case 'ArrowDown':
      direction != 'ArrowUp' && setDirection(key.code)
      break;
    case 'ArrowLeft':
      direction != 'ArrowRight' && setDirection(key.code)
      break;
    case 'ArrowRight':
      direction != 'ArrowLeft' && setDirection(key.code)
      break;
  }

  if ( start === false ) {
    start = true
    moveInterval = setInterval( () => moveSnake(), gameSpeed);
  }
}                                  //! Basándose en el resultado modifica o no modifica la dirección de la serpiente

//? Mueve a la serpiente

const moveSnake = () => {  //! Esta función mueve a la serpiente, eliminando la última posición del cuerpo de la serpiente
  let nextSquare = String(Number(snake[snake.length - 1]) + directions[direction]).padStart(4, '0');
  let nextRow = nextSquare[0] + nextSquare[1];
  let nextColumn = nextSquare[2] + nextSquare[3];

  if( Number(snake[snake.length - 1]) + directions[direction] < 0 || 
    nextSquare >= boardHeight * 100 ||
    (direction === 'ArrowRight' && nextColumn == boardWidth) ||
    (direction === 'ArrowLeft' && nextColumn == 99 ||
    boardSquares[Number(nextRow)][Number(nextColumn)] === squareTypes.snakeSquare) ) {
    return gameOver();
  } else if ( boardSquares[Number(nextRow)][Number(nextColumn)] === '🍬' ) {
    addFood()
  } else {
    const emptySquare = snake.shift();
    drawSquare(emptySquare, 'emptySquare');
  }

  snake.push(nextSquare);
  drawSnake();
  blockedButtons = false;
}                          //! Y pintando la siguiente posición
                           //! Pero si la siguiente posición está ocupada por una comida
                           //! Ya no elimina la última posición de la serpiente y ejecuta la función addFood
                           //! Además, si la siguiente posición pertenece a la serpiente o se sale del tablero, ejecuta la función gameOver

//? Termina el juego

const gameOver = () => {  //! Esta función crea el cartel de game over y pausa el juego
  clearInterval(moveInterval);
  const posterGameOver = document.createElement('div');
  const posterGameOverTitle = document.createElement('h2');
  const scoreEnd = document.createElement('span');
  const scoreMax = document.createElement('span');
  posterGameOver.classList.add('info-game-over');
  posterGameOverTitle.classList.add('info-game-over__title');
  scoreEnd.classList.add('score-end');
  scoreMax.classList.add('score-max');
  posterGameOverTitle.innerText = 'GAME OVER'
  scoreEnd.innerHTML = `SCORE &nbsp; ${String(gameScore).padStart(2, '0')}`
  if ( gameScore > localStorage.getItem("maxScore") ) {
    localStorage.setItem("maxScore", `${gameScore}`)
    scoreMax.innerHTML = `MAXSCORE &nbsp; ${String(gameScore).padStart(2, '0')}`;
  }else {
    scoreMax.innerHTML = `MAXSCORE &nbsp; ${localStorage.getItem("maxScore").padStart(2, '0')}`;
  }
  board.appendChild(posterGameOver);
  posterGameOver.appendChild(posterGameOverTitle);
  posterGameOver.appendChild(scoreEnd);
  posterGameOver.appendChild(scoreMax);
}

//? Prepara todo para comenzar el juego

const setGame = () => {  //! Esta función prepara todo lo necesario para poder comenzar el juego
  clearInterval(moveInterval)
  start = false;
  gameScore = 0;
  updateScore();
  board.innerHTML = '';
  emptySquares = [];
  createBoard();
  createSnake();
  drawSnake();
  createRandomFood();
}

//? Comienza el juego

const startGame = () => {  //! Esta función inicia el juego
  setGame();
  document.addEventListener('keydown', directionEvent);
}

//? Reinicia el juego

bntReplay.addEventListener('click', startGame)  //! Se le agrega un evento escuchador tipo click que ejecuta startGame cada vez que es llamado

//? Almacena el puntaje maximo en el LocalStorage

if ( localStorage.getItem("maxScore") === null ) {  //! Comprueba si maxScore ya existe él el localStore, de no ser así lo agrega
  localStorage.setItem("maxScore", "0")
}

startGame()

//? Lógica de la sección setting

const openSettingBoard = () => {
  btnSetting.classList.toggle('button-setting--center')
  setTimeout(() => {
    settingBoard.classList.toggle('setting-container--open')
  }, 500)
  
}

const closeSettingBoard = () => {
  settingBoard.classList.toggle('setting-container--open')
  setTimeout(() => {
    btnSetting.classList.toggle('button-setting--center')
  }, 500)
  
}

const applyChanges = () => {
  boardWidth = Number(document.getElementById('inputWidth').value)
  boardHeight = Number(document.getElementById('inputHeight').value)
  startGame()
}

btnSetting.addEventListener('click', openSettingBoard)
btnClose.addEventListener('click', closeSettingBoard)
btnApply.addEventListener('click', applyChanges)