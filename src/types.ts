import { MutableRefObject } from "react";

export interface ContextItems{
    play: (player: number, column: number, board: number[][]) => boolean;
    computerDifficulty: number;
    setComputerDifficulty: React.Dispatch<React.SetStateAction<number>>;
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

export interface BoardDetails{
    hasPlayerWon: boolean;
    setHasPlayerWon: React.Dispatch<React.SetStateAction<boolean>>;
    playerNumber: MutableRefObject<number>;
    columnWasClicked: (column: number) => void;
    setChildBoard: React.Dispatch<React.SetStateAction<number[][]>>;
    playerHasWon : (player : number) => void
}

export interface BoardRef{
    columnPlay: (column: number) => void;
    boardReset: () => void
}

export interface HasAlmostWon{
    hasWinningPosition: boolean;
    column: number
}