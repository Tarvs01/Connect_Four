import { checkWinner } from "./checkWinner";

export function getNextBestMove(board: number[][], player: number) {
    const ROW_COUNT = 7;
    const COLUMN_COUNT = 7;

    const PLAYER = 0;
    const AI = 1;

    const EMPTY = 0;
    const PLAYER_PIECE = 1;
    const AI_PIECE = 2;

    const WINDOW_LENGTH = 4;

    function drop_piece(board: number[][], row: number, col: number, piece: number) {
        board[row][col] = piece;
    }

    function is_valid_location(board: number[][], col: number) {
        return board[ROW_COUNT - 1][col] === 0;
    }

    function get_next_open_row(board: number[][], col: number) {
        for (let i = 0; i < ROW_COUNT; i++){
            if (board[i][col] === 0) {
                return i;
            }
        }
    }

    function winning_move(board: number[][], piece: number) {
        let winner = checkWinner(board);
        if (winner.hasWinner && winner.winner === piece) {
            return true;
        }
        return false; //check this line if there are future bugs. This line was not included in original code and I can't recall if python returns false by default.
    }

    //my implementation of pythons count method for lists. Not in original code.
    function countOccurence(arr: number[],piece: number) {
        let count = 0;
        for (let i of arr) {
            if (i === piece) {
                count++;
            }
        }
        return count;
    }

    function evaluate_window(window: number[], piece: number) {
        let score = 0;
        let opp_piece = PLAYER_PIECE;
        if (piece === PLAYER_PIECE) {
            opp_piece = AI_PIECE;
        }

        if (countOccurence(window, piece) === 4) {
            score += 100;
        }
        else if (countOccurence(window, piece) === 3 && countOccurence(window, EMPTY) === 1) {
            score += 5;
        }
        else if (countOccurence(window, piece) === 2 && countOccurence(window, EMPTY) === 2) {
            score += 2;
        }

        if (countOccurence(window, opp_piece) === 3 && countOccurence(window, EMPTY) === 1) {
            score -= 4;
        }

        return score;
    }

    function score_position(board: number[][], piece: number) {
        let score = 0;

        //score center column
        
    }
}