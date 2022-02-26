'use strict'

//! HTML Elements

const bntReplay = document.getElementById("buttonReplay");  //* Hace referencia al botón Replay
const board = document.getElementById("board");  //* Hace referencia al div contenedor del tablero
const score = document.getElementById("scoreIndicator");  //* Hace referencia al span que muestra los puntos

//! Game Settings

const boardWidth = 10;  //* Define el ancho del tablero
const boardHeight = 10;  //* Define la altura del tablero
const squareTypes = {  //* Objeto que contiene los tipos de valores que podría almacenar el boardSquares
  emptySquare: '◻',  //* Valor de un espacio vacío
  snakeSquare: '🐍',  //* Valor de un espacio ocupado por el cuerpo de la serpiente
  foodSquare: '🍬'  //* Valor de un espacio ocupado por una comida
} 

//! Game Variables

let boardSquares;  //*Almacena un Array bidimensional que servirá para crear el tablero
                   //*Adicionalmente, guarda toda la información del tablero
let emptySquares; //*Almacena un Array que contiene las posiciones de los espacios vacíos, con referencia a boardSquares
let snake; //*Almacena un Array que contiene las posiciones del cuerpo de la serpiente, con referencia a boardSquares

//! Game Logic

//? Creación del tablero

const createBoard = () => {  //! Esta función crea el tablero consumiendo un Array bidimensional
  board.style.gridTemplateColumns = `repeat(${boardWidth}, 1fr)`;
  boardSquares = Array.from(Array(boardHeight), () => new Array(boardWidth).fill(squareTypes.emptySquare));
  emptySquares = [];
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

//? Creacion de la serpiente

const createSnake = () => {  //! Esta función le atribuye a la variable snake un Array
  snake = ['0000']
}                            //! Con el valor de las posiciones iniciales de la serpiente

//? Pinta a la serpiente

const drawSnake = () => {  //! Esta función pinta a la serpiente en el tablero utilizando la función drawSquare
  snake.forEach( square => drawSquare(square, 'snakeSquare'))
}

createBoard()
createSnake()
drawSnake()