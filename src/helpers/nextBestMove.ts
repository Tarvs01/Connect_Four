export function getNextOptimalMove(board: number[][], player: number): number {
  const ROWS: number = board.length;
  const COLS: number = board[0].length;
  const MAX_DEPTH: number = 6; // Adjust the depth based on desired difficulty (higher depth means stronger AI)

  function scorePosition(row: number, col: number, currentPlayer: number): number {
    const directions: number[][] = [
      [-1, 0], // Up
      [0, 1],  // Right
      [1, 0],  // Down
      [0, -1], // Left
      [-1, 1], // Diagonal up-right
      [1, 1],  // Diagonal down-right
      [1, -1], // Diagonal down-left
      [-1, -1],// Diagonal up-left
    ];

    let score: number = 0;
    for (const direction of directions) {
      let consecutiveCount: number = 0;

      for (let i: number = 1; i <= 3; i++) {
        const newRow: number = row + i * direction[0];
        const newCol: number = col + i * direction[1];

        if (
          newRow >= 0 && newRow < ROWS &&
          newCol >= 0 && newCol < COLS &&
          board[newRow][newCol] === currentPlayer
        ) {
          consecutiveCount++;
        } else {
          break;
        }
      }

      if (consecutiveCount === 3) {
        score += currentPlayer === 1 ? 1000 : -1000; // Adjust the score based on the AI's player
      } else if (consecutiveCount === 2) {
        score += currentPlayer === 1 ? 10 : -10; // Adjust the score based on the AI's player
      } else if (consecutiveCount === 1) {
        score += currentPlayer === 1 ? 1 : -1; // Adjust the score based on the AI's player
      }
    }

    return score;
  }

  function minimax(depth: number, maximizingPlayer: boolean, alpha: number, beta: number): number {
    if (depth === 0) {
      return 0; // Return heuristic evaluation for the leaf nodes
    }

    const availableMoves: number[] = [];
    for (let col: number = 0; col < COLS; col++) {
      if (board[0][col] === 0) {
        availableMoves.push(col);
      }
    }

    if (maximizingPlayer) {
      let maxScore: number = -Infinity;
      for (const move of availableMoves) {
        const row: number = getAvailableRow(move);
        board[row][move] = player;
        const score: number = minimax(depth - 1, false, alpha, beta);
        board[row][move] = 0;
        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
          break;
        }
      }
      return maxScore;
    } else {
      let minScore: number = Infinity;
      for (const move of availableMoves) {
        const row: number = getAvailableRow(move);
        board[row][move] = player === 1 ? 2 : 1;
        const score: number = minimax(depth - 1, true, alpha, beta);
        board[row][move] = 0;
        minScore = Math.min(minScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
          break;
        }
      }
      return minScore;
    }
  }

  function getAvailableRow(col: number): number {
    for (let row: number = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === 0) {
        return row;
      }
    }
    return -1; // Column is full, should not happen in a valid game state.
  }

  let bestMove: number = -1;
  let bestScore: number = -Infinity;
  const alpha: number = -Infinity;
  const beta: number = Infinity;
  const availableMoves: number[] = [];
  for (let col: number = 0; col < COLS; col++) {
    if (board[0][col] === 0) {
      availableMoves.push(col);
    }
  }

  for (const move of availableMoves) {
    const row: number = getAvailableRow(move);
    board[row][move] = player;
    const score: number = minimax(MAX_DEPTH, false, alpha, beta);
    board[row][move] = 0;
    if ((player === 1 && score > bestScore) || (player === 2 && score < bestScore)) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

// Example usage:
const board: number[][] = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 0],
  [2, 0, 1, 1, 0, 0, 0],
];

const playerToOptimize: number = 2; // Replace with 2 to optimize for player 2
const nextMove: number = getNextOptimalMove(board, playerToOptimize);
console.log(`Next optimal move for Player ${playerToOptimize}: Column ${nextMove}`);
