import React, { useState, useRef, useContext } from "react";
import Board from "./Board";
import PlayerScore from "./PlayerScore";
import { BoardRef } from "../types";
import { Link } from "react-router-dom";
import { Game } from "../AI/connect-four";
import { checkWinner } from "../helpers/checkWinner";
import { AppContext } from "./AppProvider";
import axios from "axios";

function PVC() {
  const context = useContext(AppContext);
  const [hasPlayerWon, setHasPlayerWon] = useState(false);
  const [childBoard, setChildBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  const plays = useRef<string>("");

  const [isAIThinking, setIsAIThinking] = useState(false);
  let playerOneScore = useRef<number>(0);
  let playerTwoScore = useRef<number>(0);
  let computerNumber = 2;
  const playerNumber = useRef<number>(1);
  const childRef = useRef<BoardRef>(null);
  let currentGame = useRef<Game>(new Game(context?.computerDifficulty));

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

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function updatePlays(column: number) {
    plays.current += `${column + 1}`;
  }

  async function columnWasClicked(column: number) {
    console.log(context?.computerDifficulty);
    console.log("current plays is : ", plays.current);

    if (
      hasPlayerWon ||
      (playerNumber.current !== computerNumber && !canPlayColumn(column)) ||
      checkWinner(childBoard).hasWinner
    ) {
      return;
    }
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
      setIsAIThinking(true);
      if (context!.computerDifficulty <= 10) {
        console.log("lesser difficulty running");

        await sleep(100);
        let aiPlay = currentGame.current.act(1);
        childRef.current?.columnPlay(aiPlay);
        updatePlays(aiPlay);
      } else {
        let resp = await axios.get(
          `https://connect4.gamesolver.org/solve?pos=${plays.current}`
        );
        let arrayPlays: number[] = resp.data.score;
        let maxValue: number = arrayPlays.reduce(
          (a, b) => Math.max(a, b),
          -Infinity
        );
        console.log(arrayPlays);
        
        let maxPosition: number = arrayPlays.indexOf(maxValue);
        childRef.current?.columnPlay(maxPosition);
        updatePlays(maxPosition);
      }
      setIsAIThinking(false);
    } else {
      if (context!.computerDifficulty <= 10) {
        currentGame.current.act(column);
      }
      childRef.current?.columnPlay(column);
      updatePlays(column);
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
        <button
          className="reset-board"
          onClick={() => {
            currentGame.current = new Game();
            childRef.current?.boardReset();
          }}
        >
          RESET
        </button>
      </div>
      <div style={{ position: "relative" }}>
        {isAIThinking && (
          <div className="ai-think-cont">
            <p>Computer is Thinking...</p>
          </div>
        )}
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
    </div>
  );
}

export default PVC;
