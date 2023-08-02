import React, { useState, useRef } from "react";
import Board from "./Board";
import PlayerScore from "./PlayerScore";
import { BoardRef } from "../types";

function PVP() {
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
  const playerNumber = useRef<number>(1);
  const childRef = useRef<BoardRef>(null);
  let boardObject = {
    hasPlayerWon,
    setHasPlayerWon,
    playerNumber,
    columnWasClicked,
    setChildBoard,
  };

  function columnWasClicked(column: number) {
    childRef.current?.columnPlay(column);

    setChildBoard(childBoard); //This line is pretty useless in the PVP component. I just used it to remove the warning for not using childBoard. The use of childBoard comes into play in the PVC component
  }
  return (
    <div>
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

export default PVP;
