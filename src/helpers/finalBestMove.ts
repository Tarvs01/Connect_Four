export default function findNextBestMove(
  funcBoard: number[][],
  score: number,
  depth: number
) {
  const ROWS = 6;
  const COLUMNS = 7;
  let gameScore = score;
  let player = 1;

  function getBoardScore(board: number[][]) {
    let points = 0;
    let verticalPoints = 0;
    let horizontalPoints = 0;
    let diagonalPoints1 = 0;
    let diagonal_points2 = 0;

    //vertical points
    for (let row = 0; row < ROWS - 3; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        let score = scorePosition(board, row, column, 1, 0);
        if (score === gameScore) {
          return gameScore;
        }
        if (score === -gameScore) {
          return -gameScore;
        }
        verticalPoints += score;
      }
    }

    //horizontal points
    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS - 3; column++) {
        let score = scorePosition(board, row, column, 0, 1);
        if (score === gameScore) {
          return gameScore;
        }
        if (score === -gameScore) {
          return -gameScore;
        }
        horizontalPoints += score;
      }
    }

    //diagonal points 1
    for (let row = 0; row < ROWS - 3; row++) {
      for (let column = 0; column < COLUMNS - 3; column++) {
        let score = scorePosition(board, row, column, 1, 1);
        if (score === gameScore) {
          return gameScore;
        }
        if (score === -gameScore) {
          return -gameScore;
        }
        diagonalPoints1 += score;
      }
    }

    //diagonal points 2
    for (let row = 3; row < ROWS; row++) {
      for (let column = 0; column <= COLUMNS - 4; column++) {
        let score = scorePosition(board, row, column, -1, 1);
        if (score === gameScore) {
          return gameScore;
        }
        if (score === -gameScore) {
          return -gameScore;
        }
        diagonal_points2 += score;
      }
    }

    points =
      horizontalPoints + verticalPoints + diagonalPoints1 + diagonal_points2;

    return points;
  }

  function scorePosition(
    board: number[][],
    row: number,
    column: number,
    deltaY: number,
    deltaX: number
  ) {
    let humanPoints = 0;
    let computerPoints = 0;

    for (let i = 0; i < 4; i++) {
      if (board[row][column] === 1) {
        humanPoints++;
      } else if (board[row][column] === 2) {
        computerPoints++;
      }

      row += deltaY;
      column += deltaX;
    }

    if (humanPoints === 4) {
      return -gameScore;
    } else if (computerPoints === 4) {
      return gameScore;
    } else {
      return computerPoints;
    }
  }

  function isFull(board: number[][]) {
    for (let i = 0; i < COLUMNS; i++) {
      if (board[0][i] === 0) {
        return false;
      }
    }

    return true;
  }

  function isFinished(board: number[][], depth: number, score: number) {
    if (
      depth === 0 ||
      score === gameScore ||
      score === -gameScore ||
      isFull(board)
    ) {
      return true;
    }
    return false;
  }

  function copy(board: number[][]) {
    let newBoard = new Array();
    for (let i = 0; i < board.length; i++) {
      newBoard.push(board[i].slice());
    }

    return newBoard;
  }

  function place(board: number[][], column: number) {
    if (board[0][column] === 0 && column >= 0 && column < COLUMNS) {
      for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y][column] === 0) {
          board[y][column] = player;
          break;
        }
      }
      player = (player % 2) + 1;
      return true;
    } else {
      return false;
    }
  }

  function maximizePlay(
    board: number[][],
    depth: number,
    alpha: number,
    beta: number
  ) {
    let score = getBoardScore(board);

    if (isFinished(board, depth, score)) {
      let tempReturn: [number | null, number] = [null, score];
      return tempReturn;
    }

    let max: [number | null, number] = [null, -99999];

    for (let column = 0; column < COLUMNS; column++) {
      let newBoard = copy(board);
      if (place(newBoard, column)) {
        let nextMove = minimizePlay(newBoard, depth - 1, alpha, beta);
        if (max[0] == null || nextMove[1] > max[1]) {
          max[0] = column;
          max[1] = nextMove[1];
          alpha = nextMove[1];
        }

        if (alpha >= beta) {
          return max;
        }
      }
    }
    return max;
  }

  function minimizePlay(
    board: number[][],
    depth: number,
    alpha: number,
    beta: number
  ) {
    let score = getBoardScore(board);

    if (isFinished(board, depth, score)) {
      let tempReturn: [number | null, number] = [null, score];
      return tempReturn;
    }

    let min: [null | number, number] = [null, 99999];

    for (let column = 0; column < COLUMNS; column++) {
      let newBoard = copy(board);
      if (place(newBoard, column)) {
        let nextMove: [number | null, number] = maximizePlay(
          newBoard,
          depth - 1,
          alpha,
          beta
        );

        if (min[0] == null || nextMove[1] < min[1]) {
          min[0] = column;
          min[1] = nextMove[1];
          beta = nextMove[1];
        }

        if (alpha >= beta) {
          return min;
        }
      }
    }
    return min;
  }

  let bMove = maximizePlay(copy(funcBoard), depth, -Infinity, Infinity);
  return [bMove[0], gameScore];
}
