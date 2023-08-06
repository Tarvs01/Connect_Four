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
            else {
                count = 0; //This line is pretty useless cause it searches from top to bottom, so if the top 3 are not the same piece, then there is obviously no immediate winning chance on that column
            }
        }
    }

    //positive diagonal checks. Divides checks into two.
    //first positive diagonal check
    for (let i = 1; i < COLS - 3; i++){
        let count = 0;
        for (let j = 0; i + j < COLS; j++){
            if (board[j][i + j] === player) {
                count++;
                if (count === 2) {
                    if (i + j + 2 < COLS && board[j + 1][i + j + 1] === 0 && board[j + 2][i + j + 2] === player) {
                        return { hasWinningPosition: true, column: i + j + 1 };
                    }
                    if (i + j - 3 >= i && board[j - 2][i + j - 2] === 0 && board[j - 3][i + j - 3] === player) {
                        return { hasWinningPosition: true, column: i + j - 2 };
                    }
                }

                if (count === 3) {
                    if (i + j + 1 < COLS && board[j + 1][i + j + 1] === 0) {
                        return { hasWinningPosition: true, column: i + j + 1 };
                    }
                    if (i + j - 3 >= i && board[j - 3][i + j - 3] === 0) {
                        return { hasWinningPosition: true, column: i + j - 3 };
                    }
                }
            }
            else {
                count = 0;
            }
        }
    }

    //second positive diagonal check
    for (let i = 0; i < ROWS - 3; i++){
        let count = 0;
        for (let j = 0; i + j < ROWS; j++){
            if (board[i + j][j] === player) {
                count++;
                if (count === 2) {
                    if (i + j + 2 < ROWS && board[i + j + 1][j + 1] === 0 && board[i + j + 2][j + 2] === player) {
                        return { hasWinningPosition: true, column: j + 1 };
                    }
                    if (i + j - 3 >= i && board[i + j - 2][j - 2] === 0 && board[i + j - 3][j - 3] === player) {
                        return { hasWinningPosition: true, column: j - 2 };
                    }
                }

                if (count === 3) {
                    if (i + j + 1 < ROWS && board[i + j + 1][j + 1] === 0) {
                        return { hasWinningPosition: true, column: j + 1 };
                    }
                    if (i + j - 3 >= i && board[i + j - 3][j - 3] === 0) {
                        return { hasWinningPosition: true, column: j - 3 };
                    }
                }
            }
            else {
                count = 0;
            }
        }
    }


    //negative diagonal check. Divides checks into two.
    //first negative diagonal check
    for (let i = 3; i < COLS; i++){
        let count = 0;
        for (let j = 0; i - j >= 0; j++){
            if (board[j][i - j] === player) {
                count++;
                if (count === 2) {
                    if (i - j - 2 >= 0 && board[j + 1][i - j - 1] === 0 && board[j + 2][i - j - 2] === player) {
                        return { hasWinningPosition: true, column: i - j - 1 };
                    }

                    if (i - j + 3 <= i && board[j - 2][i - j + 2] === 0 && board[j - 3][i - j + 3] === player) {
                        return {hasWinningPosition: true, column: i - j + 2}
                    }
                }

                if (count === 3) {
                    if (i - j - 1 >= 0 && board[j - 1][i - j - 1] === 0) {
                        return { hasWinningPosition: true, column: i - j - 1 };
                    }

                    if (i - j + 3 <= i && board[j - 3][i - j + 3] === 0) {
                        return { hasWinningPosition: true, column: i - j + 3 };
                    }
                }
            }
            else {
                count = 0;
            }
        }
    }

    //second negative diagonal check
    for (let i = 1; i < ROWS - 3; i++){
        let count = 0;
        for (let j = 0; i + j < ROWS; j++){
            if (board[i + j][COLS - 1 - j] === player) {
                count++;
                if (count === 2) {
                    if (i + j + 2 < ROWS && board[i + j + 1][COLS - 1 - j - 1] === 0 && board[i + j + 2][COLS - 1 - j - 2] === player) {
                        return { hasWinningPosition: true, column: COLS - 1 - j - 1 };
                    }

                    if (i + j - 3 >= i && board[i + j - 2][COLS - 1 - j + 2] === 0 && board[i + j - 3][COLS - 1 - j + 3] === player) {
                        return { hasWinningPosition: true, column: COLS - 1 - j + 2 };
                    }
                }

                if (count === 3) {
                    if (i + j + 1 < ROWS && board[i + j + 1][COLS - 1 - j - 1] === 0) {
                        return { hasWinningPosition: true, column: COLS - 1 - j - 1 };
                    }

                    if (i + j - 3 >= i && board[i + j - 3][COLS - 1 - j + 3] === 0) {
                        return { hasWinningPosition: true, column: COLS - 1 - j + 3 };
                    }
                }
            }
            else {
                count = 0;
            }
        }
    }

    return { hasWinningPosition: false, column: Infinity };
}