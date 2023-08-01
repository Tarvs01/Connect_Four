export interface ContextItems{
    play: (player: number, column: number, board: number[][]) => (boolean | number[][])[],
}

export interface CellDetails{
    row: number;
    column: number
    player: number;
}

export interface ColumnDetails{
    board: number[][];
    columnPlay: (column: number) => void;
    columnNumber: number
}

export interface CheckWinnerReturn{
    hasWinner: boolean;
    row: number;
    column: number;
    winner: number;
    direction: string
}