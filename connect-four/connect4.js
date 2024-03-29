/* Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])*/

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i=0;i<HEIGHT;i++){
    var temp =[];
    for(let j=0;j<WIDTH;j++){
      temp.push(null);
    }
    board.push(temp)
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "board" variable from the item in HTML w/ID of "board"
let board = document.getElementById("board");
  // TODO: add comment for this code
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  // Creates HTML Board. Adjust HEIGHT/WIDTH variables to adjust board size.
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  let i = HEIGHT-1;
  console.log(board[i][x])
  while(i > -1 && board[i][x] !== null) {
    i--
  }
  if (i === -1) {
    return;
  }
  board[i][x] = currPlayer;
    return i;
}

  
// while(board[i][x] !== null) {
//   i--;
//}
  // TODO: write the real version of this, rather than always returning 0
  //return i;
// }

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  if (y === undefined) {
    alert("You can't click there cutiepie");
    return;
  }
  let td = document.getElementById(y+'-'+x);
    let div = document.createElement("div")
    if(currPlayer === 1) {
    div.className = "piece p1"
  } else {
  div.className = "piece p2"
}
    td.appendChild(div)
    console.log(board)
    
  }


/** endGame: announce game end */

function endGame(msg) {
  setTimeout(() => alert(`Congratulations Player ${msg}`),10 );
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  
  if (y === null) {
    return;
  }
  

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // check for win
  if (checkForWin()) {
    endGame(currPlayer);
  }


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
        ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === currPlayer
    );
  }

  // Check if there are four in a row/col/diag, 
  // TODO: check if every direction works

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
