import React, { useState, useRef } from "react";
import Board from "./Board";
import PlayerScore from "./PlayerScore";
import { BoardRef } from "../types";
import { Link } from "react-router-dom";

function PVP() {
  const [hasPlayerWon, setHasPlayerWon] = useState(false);
  const [childBoard, setChildBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  let playerOneScore = useRef<number>(0);
  let playerTwoScore = useRef<number>(0);
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

  function columnWasClicked(column: number) {
    childRef.current?.columnPlay(column);

    setChildBoard(childBoard); //This line is pretty useless in the PVP component. I just used it to remove the warning for not using childBoard. The use of childBoard comes into play in the PVC component
  }

  function playerHasWon(player: number) {
    if (player === 1) {
      playerOneScore.current += 1;
    } else {
      playerTwoScore.current += 1;
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

export default PVP;
