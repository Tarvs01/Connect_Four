import React, { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "./AppProvider";
import Column from "./Column";
import { checkWinner } from "../helpers/checkWinner";
import { CheckWinnerReturn } from "../types";

function Board() {

  //use this test case later
  /* useEffect(() => {
    let winnerRect = document.createElement("div");
    winnerRect.className = "winnerRect";

    let boardcell = document.querySelector(".boardcell10");

    boardcell?.appendChild(winnerRect);
  }) */

  let context = useContext(AppContext);
  let playa = useRef<number>(1);
  let player = playa.current;
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  const [hasPlayerWon, setHasPlayerWon] = useState(false);

  function columnPlay(column: number) {
    if (hasPlayerWon) {
      return;
    }
    let status: any = context!.play(player, column, board);
    if (status[0]) {
      playa.current = (player % 2) + 1;
      let newBoard: number[][] = [];
      newBoard[0] = board[0];
      newBoard[1] = board[1];
      newBoard[2] = board[2];
      newBoard[3] = board[3];
      newBoard[4] = board[4];
      newBoard[5] = board[5];
      newBoard[6] = board[6];
      setBoard(newBoard);
    } else {
      console.log("column full");
    }

    let winnerStatus = checkWinner(board);

    if (winnerStatus.hasWinner) {
      console.log("There is a winner");
      console.log(winnerStatus);
      setHasPlayerWon(true);
      //draw winner later
      /* setTimeout(() => {
        drawWinner(winnerStatus);
      }, winnerStatus.row * 100); */
    }
  }

  function drawWinner(winner: CheckWinnerReturn) {
    if (winner.direction === "horizontal") {
      let winnerRect = document.createElement("div");
      winnerRect.className = "winnerRect";

      let lastTile = document.querySelector(
        `.boardcell${winner.row}${winner.column}`
      );
      console.log(lastTile);
      winnerRect.style.transform = "rotate(90deg)";
      winnerRect.style.height = "320px";

      lastTile?.appendChild(winnerRect);
    }
  }

  return (
    <div className="board">
      <Column board={board} columnPlay={columnPlay} columnNumber={0} />
      <Column board={board} columnPlay={columnPlay} columnNumber={1} />
      <Column board={board} columnPlay={columnPlay} columnNumber={2} />
      <Column board={board} columnPlay={columnPlay} columnNumber={3} />
      <Column board={board} columnPlay={columnPlay} columnNumber={4} />
      <Column board={board} columnPlay={columnPlay} columnNumber={5} />
      <Column board={board} columnPlay={columnPlay} columnNumber={6} />
    </div>
  );
}

export default Board;
