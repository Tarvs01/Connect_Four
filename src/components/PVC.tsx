import React, { useState, useRef } from "react";
import Board from "./Board";
import PlayerScore from "./PlayerScore";
import { BoardRef } from "../types";
import { Link } from "react-router-dom";
import { HasAlmostWon } from "../types";
import { hasAlmostWon } from "../helpers/hasAlmostWon";
import findNextBestMove from "../helpers/finalBestMove";

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
  const [gameScore, setGameScore] = useState(100000);
  let playerOneScore = useRef<number>(0);
  let playerTwoScore = useRef<number>(0);
  let computerNumber = 2;
  const playerNumber = useRef<number>(1);
  const childRef = useRef<BoardRef>(null);

  let boardObject = {
    hasPlayerWon,
    setHasPlayerWon,
    playerNumber,
    columnWasClicked,
    setChildBoard,
    playerHasWon,
  };

  function canPlayColumn(col: number): boolean {
    return childBoard[0][col] === 0;
  }

  function columnWasClicked(column: number) {
    if (playerNumber.current === computerNumber) {
      /* let aiWinChance: HasAlmostWon = hasAlmostWon(childBoard, computerNumber);
      let playerWinChance: HasAlmostWon = hasAlmostWon(
        childBoard,
        (computerNumber % 2) + 1
      );
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
      } */
      let nbmove = findNextBestMove(childBoard, gameScore, 6);
      console.log(nbmove);
      if (nbmove[0] !== null && nbmove[1]) {
        setGameScore(nbmove[1]);
        childRef.current?.columnPlay(nbmove[0]);
      }
    } else {
      childRef.current?.columnPlay(column);
      setTimeout(() => columnWasClicked(0), 500);
    }
  }

  function playerHasWon(player: number) {
    if (player === 1) {
      playerOneScore.current += 1;
    } else {
      playerTwoScore.current += 1;
    }
  }
  return (
    <div className="playing-field">
      <div className="controls-cont">
        <Link to="/">
          <button className="to-menu">MENU</button>
        </Link>
        <button className="reset-board" onClick={childRef.current?.boardReset}>
          RESET
        </button>
      </div>
      <PlayerScore score={playerOneScore.current} playerNumber={"One"} />
      <Board
        /* hasPlayerWon={hasPlayerWon}
        setHasPlayerWon={setHasPlayerWon}
        playerNumber={playerNumber}
        columnWasClicked={columnWasClicked} */
        {...boardObject}
        ref={childRef}
      />
      <PlayerScore score={playerTwoScore.current} playerNumber={"Two"} />
    </div>
  );
}

export default PVC;
