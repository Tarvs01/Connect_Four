export const ra_ah = 89;
//remove above line man

const ROWS = 6;
const COLS = 7;

// Function to create an empty Connect Four board
function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

// Function to make a move on the board
function makeMove(board : number[][], col : number, player : number) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      board[row][col] = player;
      break;
    }
  }
}

// Function to check if the board is full
function isBoardFull(board : number[][]) {
  return board.every(row => row.every(cell => cell !== 0));
}

// Function to check if a player has won
function checkWin(board : number[][], player : number) {
  // Check horizontal
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col <= COLS - 4; col++) {
      if (board[row][col] === player &&
          board[row][col + 1] === player &&
          board[row][col + 2] === player &&
          board[row][col + 3] === player) {
        return true;
      }
    }
  }

  // Check vertical
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row <= ROWS - 4; row++) {
      if (board[row][col] === player &&
          board[row + 1][col] === player &&
          board[row + 2][col] === player &&
          board[row + 3][col] === player) {
        return true;
      }
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let row = 0; row <= ROWS - 4; row++) {
    for (let col = 0; col <= COLS - 4; col++) {
      if (board[row][col] === player &&
          board[row + 1][col + 1] === player &&
          board[row + 2][col + 2] === player &&
          board[row + 3][col + 3] === player) {
        return true;
      }
    }
  }

  // Check diagonal (top-right to bottom-left)
  for (let row = 0; row <= ROWS - 4; row++) {
    for (let col = 3; col < COLS; col++) {
      if (board[row][col] === player &&
          board[row + 1][col - 1] === player &&
          board[row + 2][col - 2] === player &&
          board[row + 3][col - 3] === player) {
        return true;
      }
    }
  }

  return false;
}

// Function to evaluate the board and calculate a score
function evaluateBoard(board : number[][]) {
  // Score each player's pieces and return the difference
  const player1Score = board.flat().filter(cell => cell === 1).length;
  const player2Score = board.flat().filter(cell => cell === 2).length;
  return player1Score - player2Score;
}

// Minimax function with Alpha-Beta Pruning
function minimax(board : number[][], depth : number, maximizingPlayer : boolean, alpha : number, beta : number) {
  if (depth === 0 || isBoardFull(board) || checkWin(board, 1) || checkWin(board, 2)) {
    return evaluateBoard(board);
  }

  if (maximizingPlayer) {
    let maxScore = -Infinity;
    for (let col = 0; col < COLS; col++) {
      if (board[0][col] === 0) {
        const newBoard = board.map(row => row.slice());
        makeMove(newBoard, col, 1);
        const score = minimax(newBoard, depth - 1, false, alpha, beta);
        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, score);
        if (alpha >= beta) {
          break;
        }
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let col = 0; col < COLS; col++) {
      if (board[0][col] === 0) {
        const newBoard = board.map(row => row.slice());
        makeMove(newBoard, col, 2);
        const score = minimax(newBoard, depth - 1, true, alpha, beta);
        minScore = Math.min(minScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return minScore;
  }
}

// Function to find the best move using the minimax algorithm
function findBestMove(board : number[][]) {
  let bestMove = null;
  let bestScore = -Infinity;

  for (let col = 0; col < COLS; col++) {
    if (board[0][col] === 0) {
      const newBoard = board.map(row => row.slice());
      makeMove(newBoard, col, 1);
      const score = minimax(newBoard, 4, false, -Infinity, Infinity);

      if (score > bestScore) {
        bestScore = score;
        bestMove = col;
      }
    }
  }

  return bestMove;
}

// Example usage
/* let board = createBoard(); */

// Play the game
/* while (!isBoardFull(board) && !checkWin(board, 1) && !checkWin(board, 2)) { */
  // Player 1's move (human player)
/*   const player1Move = Number(prompt('Player 1, enter your move (0-6):'));
  if (isNaN(player1Move) || player1Move < 0 || player1Move > 6 || board[0][player1Move] !== 0) {
    alert('Invalid move! Please try again.');
    continue;
  }
  makeMove(board, player1Move, 1); */

  // Display the board after player 1's move
/*   console.log(board.map(row => row.join(' ')).join('\n'));

  if (isBoardFull(board) || checkWin(board, 1) || checkWin(board, 2)) {
    break;
  } */

  // Player 2's move (bot)
/*   const player2Move = findBestMove(board);
  makeMove(board, player2Move, 2); */

  // Display the board after player 2's move
/*   console.log(board.map(row => row.join(' ')).join('\n'));
} */

// Check the winner or if the game is a draw
/* if (checkWin(board, 1)) {
    console.log('Player 1 wins!');
} else if (checkWin(board, 2)) {
    console.log("player 2 wins");
}
else {
    console.log("draw");
} */

const arr = 
[[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]];

        console.log(findBestMove(arr));
        