import { HasAlmostWon } from "../types";

export function hasAlmostWon(board: number[][], player: number) : HasAlmostWon {
    const ROWS = board.length;
    const COLS = board[0].length;
    //horizontal checks
    for (let i = 0; i < ROWS; i++){
        let count = 0;
        for (let j = 0; j < COLS; j++){
            if (board[i][j] === player) {
                count++;
                if (count === 2) {
                    if (j - 3 >= 0 && board[i][j - 2] === 0 && board[i][j - 3] === player) {
                        return { "hasWinningPosition": true, column: j - 2 };
                    }
                    if (j + 2 < COLS && board[i][j + 1] === 0 && board[i][j + 2] === player) {
                        return { "hasWinningPosition": true, column: j + 1 };
                    }
                }

                if (count === 3) {
                    if (j + 1 < COLS && board[i][j + 1] === 0) {
                        return { "hasWinningPosition": true, column: j + 1 };
                    }
                    if (j - 3 >= 0 && board[i][j - 3] === 0) {
                        return { "hasWinningPosition": true, column: j - 3 };
                    }
                }
            }
            else {
                count = 0;
            }
        }
    }

    //vertical checks
    for (let i = 0; i < COLS; i++){
        let count = 0;
        for (let j = 0; j < ROWS; j++){
            if (board[j][i] === player) {
                count++;
                if (count === 3) {
                    if (j - 3 >= 0 && board[j - 3][i] === 0) {
                        return { "hasWinningPosition": true, column: i };
                    }
                }
            }
        }
    }

    return { hasWinningPosition: false, column: Infinity };
}