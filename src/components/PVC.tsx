import React, { useState, useRef } from "react";
import Board from "./Board";
import PlayerScore from "./PlayerScore";
import { BoardRef } from "../types";
import { Link } from "react-router-dom";
import { HasAlmostWon } from "../types";
import { hasAlmostWon } from "../helpers/hasAlmostWon";

function PVC() {
  const [hasPlayerWon, setHasPlayerWon] = useState(false);
  const [childBoard, setChildBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  let computerNumber = 2;
  const playerNumber = useRef<number>(1);
  const childRef = useRef<BoardRef>(null);
  let boardObject = {
    hasPlayerWon,
    setHasPlayerWon,
    playerNumber,
    columnWasClicked,
    setChildBoard,
  };

  function canPlayColumn(col: number): boolean {
    return childBoard[0][col] === 0;
  }

  function columnWasClicked(column: number) {
    if (playerNumber.current === computerNumber) {
      let aiWinChance = hasAlmostWon(childBoard, computerNumber);
      let playerWinChance = hasAlmostWon(childBoard, (computerNumber % 2) + 1);
      if (
        aiWinChance.hasWinningPosition ||
        playerWinChance.hasWinningPosition
      ) {
        if (aiWinChance.hasWinningPosition) {
          childRef.current?.columnPlay(aiWinChance.column);
        } else {
          childRef.current?.columnPlay(playerWinChance.column);
        }
      } else {
        let randColumn = Math.floor(Math.random() * 7);
        while (!canPlayColumn(randColumn)) {
          randColumn = Math.floor(Math.random() * 7);
        }
        childRef.current?.columnPlay(randColumn);
      }
    } else {
      childRef.current?.columnPlay(column);
      setTimeout(() => columnWasClicked(0), 500);
    }
  }
  return (
    <div>
      <div className="controls-cont">
        <Link to="/">
          <button className="to-menu">MENU</button>
        </Link>
        <button className="reset-board" onClick={childRef.current?.boardReset}>
          RESET
        </button>
      </div>
      <PlayerScore />
      <Board
        /* hasPlayerWon={hasPlayerWon}
        setHasPlayerWon={setHasPlayerWon}
        playerNumber={playerNumber}
        columnWasClicked={columnWasClicked} */
        {...boardObject}
        ref={childRef}
      />
      <PlayerScore />
    </div>
  );
}

export default PVC;
