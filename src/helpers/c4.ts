import { Board } from "./board";
/**
 * Minimax (+Alpha-Beta) Implementation
 * @plain javascript version
 */
interface GameProperties{
  rows: number;
  columns: number;
  }

export class Game {
  rows: number;
  columns: number;
  status: number;
  depth: number;
  score: number;
  round: number;
  winning_array: [];
  iterations: number;
  board: Board;
  
  constructor() {
    this.rows = 6; // Height
    this.columns = 7; // Width
    this.status = 0; // 0: running, 1: won, 2: lost, 3: tie
    this.depth = 6; // Search depth
    this.score = 100000; // Win/loss score
    this.round = 0; // 0: Human, 1: Computer
    this.winning_array = []; // Winning (chips) array
    this.iterations = 0; // Iteration count
    this.board = new Board(this, [], 0);
    this.init();
  }

  maximizePlay(board : Board, depth : number, alpha : number | null, beta : number | null) {
    // Call score of our board
    var score = board.score();

    // Break
    if (board.isFinished(depth, score)) return [null, score];

    // Column, Score
    var max = [null, -99999];

    // For all possible moves
    for (var column = 0; column < this.columns; column++) {
      var new_board = board.copy(); // Create new board

      if (new_board.place(column)) {
        this.iterations++; // Debug

        var next_move = this.minimizePlay(new_board, depth - 1, alpha, beta); // Recursive calling

        // Evaluate new move
        if (max[0] == null || (next_move[1] == null ? 0 : next_move[1]) > (max[1] == null ? 0 : max[1])) {
          max[0] = column;
          max[1] = next_move[1];
          alpha = next_move[1];
        }

        if ((alpha == null ? 0 : alpha) >= (beta == null ? 0 : beta)) return max;
      }
    }

    return max;
  }

  minimizePlay(board : Board, depth : number, alpha : number | null, beta : number | null) {
    var score = board.score();

    if (board.isFinished(depth, score)) return [null, score];

    // Column, score
    var min = [null, 99999];

    for (var column = 0; column < this.columns; column++) {
      var new_board = board.copy();

      if (new_board.place(column)) {
        this.iterations++;

        var next_move = this.maximizePlay(new_board, depth - 1, alpha, beta);

        if (min[0] == null || (next_move[1] == null ? 0 : next_move[1]) < (min[1] == null ? 0 : min[1])) {
          min[0] = column;
          min[1] = next_move[1];
          beta = next_move[1];
        }

        if ((alpha == null ? 0 : alpha) >= (beta == null ? 0 : beta)) return min;
      }
    }
    return min;
  }

  generateComputerDecision() {
    let ai_move : any[] = [];
    if (
      this.board.score() != this.score &&
      this.board.score() != -this.score &&
      !this.board.isFull()
    ) {
      // AI is thinking

      // Algorithm call
      ai_move = this.maximizePlay(this.board, this.depth, 0, 0);

      console.log(ai_move);
      // Place ai decision
      this.place(ai_move[0]);
    }
    return ai_move[0];
  }

  act(column : number) {
    // Human round
    if (this.round == 0) {
      this.place(column);
      return 0;
    }

    // Computer round
    if (this.round == 1) {
      return this.generateComputerDecision();
    }
  }

  place(column : number) {
    // If not finished
    if (
      this.board.score() != this.score &&
      this.board.score() != -this.score &&
      !this.board.isFull()
    ) {
      if (!this.board.place(column)) {
        return alert("Invalid move!");
      }

      this.round = this.switchRound(this.round);
    }
  }

  switchRound(round : number) {
    // 0 Human, 1 Computer
    if (round == 0) {
      return 1;
    } else {
      return 0;
    }
  }

  init() {
  // Generate 'real' board
  // Create 2-dimensional array
  var game_board = new Array(this.rows);
  for (var i = 0; i < game_board.length; i++) {
    game_board[i] = new Array(this.columns);

    for (var j = 0; j < game_board[i].length; j++) {
      game_board[i][j] = null;
    }
  }

  // Create from board object (see board.js)
  this.board = new Board(this, game_board, 0);
};

}

