import React, {
  useContext,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { AppContext } from "./AppProvider";
import Column from "./Column";
import { checkWinner } from "../helpers/checkWinner";
import { CheckWinnerReturn } from "../types";
import { BoardDetails, BoardRef } from "../types";

const Board = forwardRef<BoardRef, BoardDetails>((props, ref) => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  let {
    hasPlayerWon,
    setHasPlayerWon,
    columnWasClicked,
    playerNumber,
    setChildBoard,
    playerHasWon,
  } = props;

  useImperativeHandle(ref, () => ({
    columnPlay(column: number) {
      if (hasPlayerWon) {
        return;
      }
      let status: boolean = context!.play(player, column, board);
      if (status) {
        playerNumber.current = (player % 2) + 1;
        let newBoard: number[][] = [];
        newBoard[0] = board[0];
        newBoard[1] = board[1];
        newBoard[2] = board[2];
        newBoard[3] = board[3];
        newBoard[4] = board[4];
        newBoard[5] = board[5];
        setBoard(newBoard);
      } else {
        console.log("column full");
      }

      let winnerStatus = checkWinner(board);

      if (winnerStatus.hasWinner) {
        console.log("There is a winner");
        console.log(winnerStatus);
        playerHasWon((playerNumber.current % 2) + 1);
        setHasPlayerWon(true);
        //draw winner
        setTimeout(() => {
          drawWinner(winnerStatus);
        }, winnerStatus.row * 100);
      }
    },
    boardReset() {
      setBoard([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]);

      setHasPlayerWon(false);
      playerNumber.current = 1;
    },
  }));

  useEffect(() => {
    setChildBoard(board);
  }, [board]);

  let context = useContext(AppContext);
  let player = playerNumber.current;

  function drawWinner(winner: CheckWinnerReturn) {
    if (winner.direction === "horizontal") {
      for (let i = 0; i < 4; i++) {
        document.querySelector(
          `.cell${winner.row}${winner.column - i}`
        )!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0   16   16" stroke-width="4">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>`;
      }
    } else if (winner.direction === "vertical") {
      for (let i = 0; i < 4; i++) {
        document.querySelector(
          `.cell${winner.row - i}${winner.column}`
        )!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0   16   16" stroke-width="4">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>`;
      }
    } else if (winner.direction === "diagonalNegative") {
      for (let i = 0; i < 4; i++) {
        document.querySelector(
          `.cell${winner.row + i}${winner.column - i}`
        )!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0   16   16" stroke-width="4">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>`;
      }
    } else {
      for (let i = 0; i < 4; i++) {
        document.querySelector(
          `.cell${winner.row - i}${winner.column - i}`
        )!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0   16   16" stroke-width="4">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>`;
      }
    }
  }

  return (
    <div className="board">
      <Column board={board} columnPlay={columnWasClicked} columnNumber={0} />
      <Column board={board} columnPlay={columnWasClicked} columnNumber={1} />
      <Column board={board} columnPlay={columnWasClicked} columnNumber={2} />
      <Column board={board} columnPlay={columnWasClicked} columnNumber={3} />
      <Column board={board} columnPlay={columnWasClicked} columnNumber={4} />
      <Column board={board} columnPlay={columnWasClicked} columnNumber={5} />
      <Column board={board} columnPlay={columnWasClicked} columnNumber={6} />
    </div>
  );
});

export default Board;
