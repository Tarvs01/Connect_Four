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
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title>cancel android app aplication phone</title><g id="cancel_android_app_aplication_phone" data-name="cancel android app aplication phone"><path d="M22.36,11.05,21,9.64a2,2,0,0,0-2.83,0L16,11.76,13.88,9.64a2,2,0,0,0-2.83,0L9.64,11.05a2,2,0,0,0,0,2.83L11.76,16,9.64,18.12a2,2,0,0,0,0,2.83l1.41,1.41a2,2,0,0,0,2.83,0L16,20.24l2.12,2.12a2,2,0,0,0,2.83,0L22.36,21a2,2,0,0,0,0-2.83L20.24,16l2.12-2.12A2,2,0,0,0,22.36,11.05Zm-4.24,4.24a1,1,0,0,0,0,1.42L21,19.54,19.54,21l-2.83-2.83a1,1,0,0,0-1.42,0L12.46,21l-1.41-1.41,2.83-2.83a1,1,0,0,0,0-1.42l-2.83-2.83,1.41-1.41,2.83,2.83a1,1,0,0,0,1.42,0l2.83-2.83L21,12.46Z"/></g></svg>`;
    if (winner.direction === "horizontal") {
      for (let i = 0; i < 4; i++) {
        document.querySelector(
          `.cell${winner.row}${winner.column - i}`
        )!.innerHTML = svg;
      }
    } else if (winner.direction === "vertical") {
      for (let i = 0; i < 4; i++) {
        document.querySelector(
          `.cell${winner.row - i}${winner.column}`
        )!.innerHTML = svg;
      }
    } else if (winner.direction === "diagonalNegative") {
      for (let i = 0; i < 4; i++) {
        document.querySelector(
          `.cell${winner.row + i}${winner.column - i}`
        )!.innerHTML = svg;
      }
    } else {
      for (let i = 0; i < 4; i++) {
        document.querySelector(
          `.cell${winner.row - i}${winner.column - i}`
        )!.innerHTML = svg;
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
