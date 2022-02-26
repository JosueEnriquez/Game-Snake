'use strict'

//! HTML Elements

const bntReplay = document.getElementById("buttonReplay");
const board = document.getElementById("board");
const score = document.getElementById("scoreIndicator");

//! Game Settings

const boardWidth = 10;  //* Define el ancho del tablero
const boardHeight = 10;  //* Define la altura del tablero

//! Game Variables

let boardSquares;  //!*Almacena un Array bidimensional que servirá para crear el tablero

//! Game Logic

const createBoard = () => {  //! Esta función crea el tablero consumiendo un Array bidimensional
  board.style.gridTemplateColumns = `repeat(${boardWidth}, 1fr)`
  boardSquares = Array.from(Array(boardHeight), () => new Array(boardWidth).fill(''));
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
}

createBoard()