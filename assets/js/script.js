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

let boardSquares;  //!*Almacena un Array bidimensional que servirá para crear el tablero
                   //!*Adicionalmente, guarda toda la información del tablero

//! Game Logic

const createBoard = () => {  //! Esta función crea el tablero consumiendo un Array bidimensional
  board.style.gridTemplateColumns = `repeat(${boardWidth}, 1fr)`;
  boardSquares = Array.from(Array(boardHeight), () => new Array(boardWidth).fill(squareTypes.emptySquare));
  console.log(boardSquares);
  boardSquares.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const rowValue = String(rowIndex).padStart(2,'0');
      const columnValue = String(columnIndex).padStart(2,'0');

      const squareValue = rowValue + columnValue;
      const squareElement = document.createElement("div");
      squareElement.setAttribute('class', 'square emptySquare');
      squareElement.setAttribute('id', squareValue);
      board.appendChild(squareElement);
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
createBoard()