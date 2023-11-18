import React from "react";
import { ColumnDetails } from "../types";
import Cell from "./Cell";

function Column({ board, columnPlay, columnNumber }: ColumnDetails) {
  return (
    <div
      className="board-column"
      onClick={() => {
        columnPlay(columnNumber);
      }}
    >
      <div className={`board-cell boardcell0${columnNumber}`}>
        {board[0][columnNumber] !== 0 && (
          <Cell row={0} column={columnNumber} player={board[0][columnNumber]} />
        )}
      </div>
      <div className={`board-cell boardcell1${columnNumber}`}>
        {board[1][columnNumber] !== 0 && (
          <Cell row={1} column={columnNumber} player={board[1][columnNumber]} />
        )}
      </div>
      <div className={`board-cell boardcell2${columnNumber}`}>
        {board[2][columnNumber] !== 0 && (
          <Cell row={2} column={columnNumber} player={board[2][columnNumber]} />
        )}
      </div>
      <div className={`board-cell boardcell3${columnNumber}`}>
        {board[3][columnNumber] !== 0 && (
          <Cell row={3} column={columnNumber} player={board[3][columnNumber]} />
        )}
      </div>
      <div className={`board-cell boardcell4${columnNumber}`}>
        {board[4][columnNumber] !== 0 && (
          <Cell row={4} column={columnNumber} player={board[4][columnNumber]} />
        )}
      </div>
      <div className={`board-cell boardcell5${columnNumber}`}>
        {board[5][columnNumber] !== 0 && (
          <Cell row={5} column={columnNumber} player={board[5][columnNumber]} />
        )}
      </div>
    </div>
  );
}

export default Column;
